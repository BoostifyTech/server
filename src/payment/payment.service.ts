import { Injectable } from '@nestjs/common';
import { ChapaService } from 'chapa-nestjs';

@Injectable()
export class PaymentService {
  constructor(private readonly chapaService: ChapaService) {}

  async initializePayment(data: {
    firstName: string;
    lastName: string;
    email: string;
    amount: string;
  }) {
    const tx_ref = await this.chapaService.generateTransactionReference();

    const response = await this.chapaService.initialize({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      currency: 'ETB',
      amount: data.amount,
      tx_ref,
      return_url: `https://yourfrontend.com/success/${tx_ref}`,
      callback_url: `https://yourbackend.com/api/payment/webhook`,
      customization: {
        title: 'MiniApp Payment',
        description: 'Pay for your order',
      },
    });

    return {
      tx_ref,
      checkout_url: response.data.checkout_url,
    };
  }

  async verifyPayment(tx_ref: string) {
    const result = await this.chapaService.verify({ tx_ref });
    return result;
  }
}
