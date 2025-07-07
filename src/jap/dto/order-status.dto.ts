import { IsString } from 'class-validator';

export class OrderStatusDto {
  @IsString()
  order: string;
}
