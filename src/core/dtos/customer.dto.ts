import { IsNumber, IsPositive } from 'class-validator';

export class CustomerBalanceDto {
  @IsNumber()
  @IsPositive()
  amount: number;
}

export class CustomerResponseDto {
  id: number;
  email: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
