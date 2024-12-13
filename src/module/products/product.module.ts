import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/product.controller';
import { ProductsService } from './services/product.service';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ProductsModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
