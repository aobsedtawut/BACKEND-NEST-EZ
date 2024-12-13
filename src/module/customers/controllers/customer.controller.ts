import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from '../services/customer.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
interface JwtUser {
  id: number;
  email: string;
  username: string;
}
@ApiTags('customers')
@Controller('api')
@UseGuards(AuthGuard('jwt'))
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('balance')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returns customer balance' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async getBalance(@Req() req: Request & { user: JwtUser }) {
    const customerId = req.user.id;
    // Use customerId to fetch balance
    return this.customersService.getBalance(customerId);
  }
}
