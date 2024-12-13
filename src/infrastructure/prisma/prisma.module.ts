import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  providers: [PrismaService, JwtService],
  exports: [PrismaService, JwtService],
})
export class PrismaModule {}
