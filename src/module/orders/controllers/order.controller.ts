import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  CreateOrderDto,
  OrderItemResponseDto,
  OrderResponseDto,
} from '../../../core/dtos/create-order.dto';
import { OrdersService } from '../services/order.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('orders')
@Controller('api/orders')
@ApiBearerAuth() // เ
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, type: OrderResponseDto })
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    const order = await this.ordersService.createOrder(createOrderDto);
    return order;
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'orderId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Order found',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<OrderResponseDto> {
    return this.ordersService.getOrder(orderId);
  }

  @Get('codes/:orderId')
  @ApiOperation({ summary: 'Get redemption codes for an order' })
  @ApiParam({ name: 'orderId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Redemption codes for the order',
    type: [OrderItemResponseDto],
  })
  async getRedemptionCodes(
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<OrderItemResponseDto[]> {
    return this.ordersService.getRedemptionCodes(orderId.toString());
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Get orders by customer ID' })
  @ApiParam({ name: 'customerId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Orders found',
    type: [OrderResponseDto],
  })
  async getOrdersByCustomerId(
    @Param('customerId', ParseIntPipe) customerId: number,
  ) {
    return this.ordersService.getOrdersByCustomerId(customerId);
  }
}
