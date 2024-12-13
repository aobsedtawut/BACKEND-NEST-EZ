import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/services/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async getBalance(customerId: number): Promise<{ balance: number }> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { id: customerId },
        select: {
          balance: true,
        },
      });

      if (!customer) {
        throw new NotFoundException(`Customer not found`);
      }

      return {
        balance: Number(customer.balance),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to fetch customer balance',
      );
    }
  }

  async findById(customerId: number) {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { id: customerId },
      });

      if (!customer) {
        throw new NotFoundException(`Customer not found`);
      }

      return customer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to fetch customer details',
      );
    }
  }

  async updateBalance(
    customerId: number,
    amount: number,
  ): Promise<{ balance: number }> {
    try {
      const updatedCustomer = await this.prisma.customer.update({
        where: { id: customerId },
        data: {
          balance: {
            set: amount,
          },
        },
        select: {
          balance: true,
        },
      });

      return {
        balance: Number(updatedCustomer.balance),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Failed to update balance');
    }
  }
}
