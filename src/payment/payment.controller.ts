import { Controller, Post, Body, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  //initalize the payment
  @Post('initialize')
  async initialize(@Body() body: CreatePaymentDto) {
    return this.paymentService.initializePayment(body);
  }
  //i dont know what it returns this end point
  @Post('verify')
  async verify(@Query('tx_ref') tx_ref: string) {
    return this.paymentService.verifyPayment(tx_ref);
  }
}
