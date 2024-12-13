import { StockStatus } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateStockDto {
  @IsString()
  code: string;
}

export class StockResponseDto {
  id: number;
  productId: number;
  code: string;
  status: StockStatus;
  reservedAt?: Date;
  orderId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  order?: any;
  orderItems?: any[];
}
