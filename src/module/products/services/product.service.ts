import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/core/dtos/pagination-query.dto';
import { PrismaService } from 'src/infrastructure/prisma/services/prisma.service';
import { CreateProductDto } from 'src/core/dtos/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    // Fetch products with their stocks using Prisma
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: limit,
        include: {
          stocks: true, // Include related stocks
        },
        orderBy: {
          createdAt: 'desc', // Order by creation date, newest first
        },
      }),
      this.prisma.product.count(), // Get total count of products
    ]);

    return {
      data: products,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: skip + limit < total,
        hasPreviousPage: page > 1,
      },
    };
  }

  async create(productData: CreateProductDto) {
    // Create a new product using Prisma
    const newProduct = await this.prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        denomination: productData.denomination,
        imageUrl: productData.imageUrl,
      },
      include: {
        stocks: true, // Include stocks in the response
      },
    });

    return newProduct;
  }
}
