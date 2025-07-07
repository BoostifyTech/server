import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { JapService } from './jap.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatusDto } from './dto/order-status.dto';
import { RefillDto } from './dto/refill.dto';
import { RefillStatusDto } from './dto/refill-status.dto';
import { CancelOrdersDto } from './dto/cancel-orders.dto';
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

  @Get('balance')
  getBalance() {
    return this.japService.getBalance();
  }

  @Post('order')
  placeOrder(@Body() dto: CreateOrderDto) {
    return this.japService.placeOrder(dto.service, dto.link, dto.quantity);
  }

  @Post('status')
  getOrderStatus(@Body() dto: OrderStatusDto) {
    return this.japService.getOrderStatus(dto.order);
  }

  @Post('refill')
  requestRefill(@Body() dto: RefillDto) {
    return this.japService.requestRefill(dto.order);
  }

  @Post('refill-status')
  getRefillStatus(@Body() dto: RefillStatusDto) {
    return this.japService.getRefillStatus(dto.refill);
  }

  @Post('cancel')
  cancelOrders(@Body() dto: CancelOrdersDto) {
    return this.japService.cancelOrders(dto.orders);
  }
}
