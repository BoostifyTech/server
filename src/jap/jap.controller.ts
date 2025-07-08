import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { JapService } from './jap.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatusDto } from './dto/order-status.dto';
import { RefillDto } from './dto/refill.dto';
import { RefillStatusDto } from './dto/refill-status.dto';

import { JapServiceItem } from './types/jap-service-item.type';

@Controller('jap')
export class JapController {
  constructor(private readonly japService: JapService) {}

  @Get('services')
  getServices(): Promise<JapServiceItem[]> {
    return this.japService.getServicesAndSave();
  }

  @Get('services/filter')
  getServicesByPlatform(
    @Query('platform') platform?: string,
  ): Promise<JapServiceItem[]> {
    return this.japService.findServicesByPlatform(platform);
  }
  //i dont understand this end point
  @Get('balance')
  getBalance() {
    return this.japService.getBalance();
  }
  // to make new order
  @Post('order')
  placeOrder(@Body() dto: CreateOrderDto) {
    return this.japService.placeOrder(dto.serviceId, dto.targetUrl, dto.amount);
  }
  // to view the status of the order
  @Post('status')
  getOrderStatus(@Body() dto: OrderStatusDto) {
    return this.japService.getOrderStatus(dto.order);
  }
  //to send the refill request its form
  @Post('refill')
  requestRefill(@Body() dto: RefillDto) {
    return this.japService.requestRefill(dto.order);
  }
  //to view the status of the order its form
  @Post('refill-status')
  getRefillStatus(@Body() dto: RefillStatusDto) {
    return this.japService.getRefillStatus(dto.refill);
  }
}
