import { StockStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export interface Stock {
  id: number;
  productId: number;
  code: string;
  status: StockStatus;
  createdAt: Date;
  updatedAt: Date;
  reservedAt: Date;
}

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  price?: Decimal;
  denomination?: Decimal;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  reservedAt?: Date;
  stocks?: Stock[];
}
