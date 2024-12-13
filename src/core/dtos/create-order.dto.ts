import {
  IsPositive,
  IsArray,
  IsNumber,
  ValidateNested,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class OrderItemDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  productId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsString()
  code: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  customerId: number;

  @ApiProperty({ type: [OrderItemDto] }) // Specify array type for Swagger
  @IsArray()
  @ValidateNested({ each: true }) // Add nested validation
  @Type(() => OrderItemDto) // Add type transformation
  items: OrderItemDto[];

  // Remove total field as it should be calculated
  // total should not be input from client
}

export class OrderItemResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  code: string;
}

export class OrderResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  customerId: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  total: number;

  @ApiProperty({ type: [OrderItemDto] })
  items: Array<{
    id: number;
    productId: number;
    quantity: number;
    price: number;
    code: string;
    product?: any;
  }>;

  @ApiProperty()
  customer?: any;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
