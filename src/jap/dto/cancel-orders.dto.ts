import { IsString } from 'class-validator';

export class CancelOrdersDto {
  @IsString()
  orders: string; // comma-separated order IDs
}
