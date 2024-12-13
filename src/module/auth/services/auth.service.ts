import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from 'src/core/dtos/sign-in.dto';
import { PrismaService } from 'src/infrastructure/prisma/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from 'src/core/dtos/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Customer } from '@prisma/client';
@Injectable()
export class AuthService {
  private readonly INITIAL_BALANCE = 10000; // Default balance for new customers
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    const { email, password, name, username } = signUpDto;

    // Check if user exists
    const existingUser = await this.prisma.customer.findFirst({
      where: {
        OR: [{ email }, { email }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Email or username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
        name,
        username,
        balance: this.INITIAL_BALANCE,
      },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        balance: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '24h',
      },
    );

    return {
      user,
      token,
    };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    // Find user
    const user = await this.prisma.customer.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate token
    const token = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '24h',
      },
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        balance: user.balance,
      },
      token,
    };
  }

  async validateUser(id: number): Promise<Customer> {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }
  async signOut(userId: number) {
    try {
      await this.prisma.session.deleteMany({
        where: {
          userId: userId,
          active: true,
        },
      });
      return {
        success: true,
        message: 'Successfully signed out',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('SignOut Error:', error);
      throw new InternalServerErrorException('Failed to sign out');
    }
  }
}
