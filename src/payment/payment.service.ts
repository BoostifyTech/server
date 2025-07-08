import { Injectable } from '@nestjs/common';
import { ChapaService } from 'chapa-nestjs';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(
    private readonly chapaService: ChapaService,
    private readonly prisma: PrismaService,
  ) {}

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
      return_url: `https://boosterclient.vercel.app/success/${tx_ref}`,
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
    try {
      const result = await this.chapaService.verify({ tx_ref });

      if (result.data.status !== 'success') {
        return {
          success: false,
          message: 'Order payment failed.',
          data: {},
        };
      }

      const updatedOrder = await this.prisma.order.update({
        where: { tx_ref },
        data: { status: OrderStatus.COMPLETED },
      });

      return {
        success: true,
        message: 'Order payment successful.',
        data: { id: updatedOrder.id },
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: 'Internal server error.',
          error: error.message,
        };
      }
      return {
        success: false,
        message: 'Internal server error.',
        error: String(error), // fallback
      };
    }
  }
}
