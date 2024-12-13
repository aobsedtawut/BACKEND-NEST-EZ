import { OrderStatus as PrismaOrderStatus } from '@prisma/client';

export enum OrderStatus {
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

// Type mapping utility
export const mapPrismaToDomainStatus = (
  status: PrismaOrderStatus,
): OrderStatus => {
  const statusMap: Record<PrismaOrderStatus, OrderStatus> = {
    PROCESSING: OrderStatus.PROCESSING,
    COMPLETED: OrderStatus.COMPLETED,
    FAILED: OrderStatus.FAILED,
  };
  return statusMap[status];
};

// Reverse mapping utility
export const mapToDomainOrderStatus = (
  status: PrismaOrderStatus,
): OrderStatus => {
  switch (status) {
    case PrismaOrderStatus.PROCESSING:
      return OrderStatus.PROCESSING;
    case PrismaOrderStatus.COMPLETED:
      return OrderStatus.COMPLETED;
    case PrismaOrderStatus.FAILED:
      return OrderStatus.FAILED;
    default:
      throw new Error(`Invalid prisma order status: ${status}`);
  }
};
