import { IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  serviceId: number;

  @IsString()
  targetUrl: string;
  @IsNumber()
  @Min(1)
  amount: number;
}
