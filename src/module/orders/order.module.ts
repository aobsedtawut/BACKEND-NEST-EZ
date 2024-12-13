import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/order.controller';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { OrdersService } from './services/order.service';
import { CustomersModule } from '../customers/customer.module';
import { ProductsModule } from '../products/product.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [PrismaModule, ProductsModule, CustomersModule, JwtModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrderModule {}
