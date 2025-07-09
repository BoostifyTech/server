import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from '../prisma/prisma.service';
import { OrderService } from '../order/order.service';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, OrderService],
  exports: [PaymentService],
})
export class PaymentModule {}
