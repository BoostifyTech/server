import { Controller, Post, Body, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initialize')
  async initialize(@Body() body: CreatePaymentDto) {
    return this.paymentService.initializePayment(body);
  }

  @Post('verify')
  async verify(@Query('tx_ref') tx_ref: string) {
    return this.paymentService.verifyPayment(tx_ref);
  }

  /*@Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('chapa-signature') chapaSigHeader: string,
    @Headers('x-chapa-signature') xChapaSigHeader: string,
  ) {
    const secret = this.configService.get<string>('CHAPA_WEBHOOK_SECRET');
    const payload = JSON.stringify(req.body);

    const expectedHash = crypto
      .createHmac('sha256', secret || 'hook secret')
      .update(payload)
      .digest('hex');

    const isValid =
      expectedHash === chapaSigHeader || expectedHash === xChapaSigHeader;

    if (!isValid) {
      console.warn('⚠️ Invalid webhook signature');
      return res.status(HttpStatus.FORBIDDEN).send('Invalid signature');
    }

    const event = req.body;
    console.log('✅ Webhook received:', event);

    // You can now update order/payment status here
    if (event.event === 'charge.success' && event.status === 'success') {
      // call your service to update DB
      await this.paymentService.markPaymentSuccessful(event.tx_ref, event);
    }

    return res.status(HttpStatus.OK).send('Webhook received');
  }*/
}
