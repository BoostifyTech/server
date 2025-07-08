import { IsNotEmpty, IsString, IsUrl, IsInt } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  tx_ref: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  targetUrl: string;

  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsInt()
  @IsNotEmpty()
  serviceId: number;
}
