import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/core/dtos/create-order.dto';
import { PrismaService } from 'src/infrastructure/prisma/services/prisma.service';
import { Order, OrderItem } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<Order & { items: OrderItem[] }> {
    const orderTotal = createOrderDto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const order = await this.prisma.order.create({
      data: {
        total: orderTotal,
        status: 'PROCESSING',
        customer: {
          connect: { id: createOrderDto.customerId },
        },
      },
    });

    await this.prisma.orderItem.createMany({
      data: createOrderDto.items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        code: item.code,
      })),
    });

    return this.prisma.order.findUnique({
      where: { id: order.id },
      include: { items: true },
    });
  }

  async getOrder(orderId: number): Promise<Order & { items: OrderItem[] }> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return order;
  }

  async getOrdersByCustomerId(customerId: number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { customerId },
      include: { items: true },
    });
  }
  async getRedemptionCodes(orderId: string): Promise<OrderItem[]> {
    // Validate and parse the orderId parameter
    const parsedOrderId = parseInt(orderId, 10);
    if (isNaN(parsedOrderId)) {
      throw new BadRequestException(
        'Invalid orderId. Numeric string is expected.',
      );
    }

    return this.prisma.orderItem.findMany({
      where: { orderId: parsedOrderId },
      select: {
        id: true,
        orderId: true,
        productId: true,
        quantity: true,
        price: true,
        code: true,
      },
    });
  }
}
