import { Module } from '@nestjs/common';
import { CustomersService } from './services/customer.service';
import { CustomersController } from './controllers/customer.controller';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
