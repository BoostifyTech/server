import { Injectable } from '@nestjs/common';
import { ChapaService } from 'chapa-nestjs';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';
import { OrderService } from '../order/order.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly chapaService: ChapaService,
    private readonly prisma: PrismaService,
    private readonly orderService: OrderService,
  ) {}

  async initializePayment(data: {
    firstName: string;
    lastName: string;
    email: string;
    amount: string;
    userId: string;
    serviceId: number;
    targetUrl: string;
    totalPrice: number;
  }) {
    const tx_ref = await this.chapaService.generateTransactionReference();

    const response = await this.chapaService.initialize({
      first_name: data.firstName,
      last_name: 'abebe',
      email: 'birhanudejen617@gmail.com',
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

    await this.orderService.create({
      userId: data.userId,
      serviceId: data.serviceId,
      targetUrl: data.targetUrl,
      amount: Number(data.amount),
      totalPrice: data.totalPrice,
      tx_ref,
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
        error: String(error),
      };
    }
  }
}
