import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/core/dtos/pagination-query.dto';
import { ProductsService } from '../services/product.service';
import { CreateProductDto } from 'src/core/dtos/create-product.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Products')
@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of products',
    isArray: true,
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query() query: PaginationQueryDto) {
    return this.productsService.findAll(query);
  }

  @Post()
  @ApiBearerAuth()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
}
