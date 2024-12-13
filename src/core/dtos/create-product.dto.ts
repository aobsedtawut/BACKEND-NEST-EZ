import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateStockDto } from './stock.dto';
import { Type } from 'class-transformer';
export class CreateProductDto {
  @ApiProperty({
    example: 'Game Card 100 coins',
    description: 'Name of the product',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 100,
    description: 'Price of the product',
  })
  @IsNumber()
  @Min(0)
  price: number | Decimal;

  @ApiProperty({
    example: 100,
    description: 'Denomination value of the product',
  })
  @IsNumber()
  @Min(0)
  denomination: number | Decimal;

  @ApiProperty({
    example: '/images/icon-gacha.png',
    description: 'URL of the product image',
  })
  @IsString()
  @IsUrl({ require_tld: false })
  imageUrl: string;

  @ApiProperty({
    example: 'Virtual currency card for gaming',
    description: 'Description of the product',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    type: [CreateStockDto],
    description: 'Array of stock items',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStockDto)
  @ArrayMinSize(0)
  stocks?: CreateStockDto[];
}
