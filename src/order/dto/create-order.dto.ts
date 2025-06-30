import { IsEnum, IsNotEmpty, IsString, IsUrl, IsInt } from 'class-validator';
import { Platform, BoostAction } from '@prisma/client';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(Platform)
  category: Platform;

  @IsEnum(BoostAction)
  action: BoostAction;
  tx_ref: string;
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  targetUrl: string;

  @IsInt()
  @IsNotEmpty()
  amount: number;
}
