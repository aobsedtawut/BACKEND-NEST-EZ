export class ProductResponseDto {
  id: number;
  name: string;
  description?: string;
  price: number;
  denomination: number;
  availableStock: number;
  createdAt: Date;
  updatedAt: Date;
}
