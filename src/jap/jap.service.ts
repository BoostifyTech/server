import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { JapServiceItem } from './types/jap-service-item.type';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class JapService {
  private readonly API_URL: string;
  private readonly API_KEY: string;
  private readonly logger = new Logger(JapService.name);

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.API_URL = 'https://justanotherpanel.com/api/v2';
    this.API_KEY = this.configService.get<string>('JAP_API_KEY')!;
  }

  private async postToJAP<T = unknown>(data: Record<string, any>): Promise<T> {
    const payload = {
      key: this.API_KEY,
      ...data,
    };

    try {
      const response: AxiosResponse<T> = await axios.post(
        this.API_URL,
        payload,
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('JAP API Error:', error.message);
        throw new Error(`JAP API Error: ${error.message}`);
      } else {
        this.logger.error('Unknown error calling JAP API', error);
        throw new Error('Unknown error calling JAP API');
      }
    }
  }

  async getServicesAndSave(): Promise<JapServiceItem[]> {
    try {
      const allServices = await this.postToJAP<JapServiceItem[]>({
        action: 'services',
      });

      const allowedServiceIds = [
        '5791',
        '7474',
        '6326',
        '3747',
        '1845',
        '8092',
        '6685',
        '8811',
        '8485',
        '8494',
        '3294',
        '1080',
        '7513',
        '4994',
        '7707',
      ];

      const filtered = allServices.filter((service) =>
        allowedServiceIds.includes(String(service.service).trim()),
      );

      for (const service of filtered) {
        await this.prisma.smmService.upsert({
          where: { serviceId: Number(service.service) },
          update: {
            name: service.name,
            category: service.category,
            type: service.type,
            rate: parseFloat(service.rate),
            min: parseInt(service.min, 10),
            max: parseInt(service.max, 10),
            dripfeed: service.dripfeed,
            refill: service.refill,
            cancel: service.cancel,
          },
          create: {
            serviceId: Number(service.service),
            name: service.name,
            category: service.category,
            type: service.type,
            rate: parseFloat(service.rate),
            min: parseInt(service.min, 10),
            max: parseInt(service.max, 10),
            dripfeed: service.dripfeed,
            refill: service.refill,
            cancel: service.cancel,
          },
        });
      }

      return filtered;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('Error syncing services from JAP:', error.message);
        throw new Error(`Service sync failed: ${error.message}`);
      } else {
        this.logger.error('Unknown error syncing services', error);
        throw new Error('Unknown service sync error');
      }
    }
  }

  async getBalance() {
    return this.postToJAP({ action: 'balance' });
  }

  async placeOrder(service: number, link: string, quantity: number) {
    return this.postToJAP({
      action: 'add',
      service,
      link,
      quantity,
    });
  }

  async getOrderStatus(orderId: string) {
    return this.postToJAP({ action: 'status', order: orderId });
  }

  async requestRefill(orderId: string) {
    return this.postToJAP({ action: 'refill', order: orderId });
  }

  async getRefillStatus(refillId: string) {
    return this.postToJAP({ action: 'refill_status', refill: refillId });
  }

  async cancelOrders(orderIds: string) {
    return this.postToJAP({ action: 'cancel', orders: orderIds });
  }

  async findServicesByPlatform(platform?: string): Promise<JapServiceItem[]> {
    const where: Prisma.SmmServiceWhereInput = platform
      ? {
          category: {
            startsWith: platform.trim(),
            mode: 'insensitive', // ✅ valid QueryMode
          },
        }
      : {};

    const items = await this.prisma.smmService.findMany({ where });

    return items.map((item) => ({
      service: String(item.serviceId), // ✅ matches JapServiceItem
      name: item.name,
      type: item.type,
      category: item.category,
      rate: item.rate.toString(), // ✅ string
      min: item.min.toString(), // ✅ string
      max: item.max.toString(), // ✅ string
      dripfeed: item.dripfeed,
      refill: item.refill,
      cancel: item.cancel,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }
}
