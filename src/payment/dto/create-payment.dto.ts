import { IsEmail, IsNotEmpty, IsString, IsEnum, IsInt } from 'class-validator';
import { OrderStatus, BoostAction, Platform } from '@prisma/client';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  tx_ref: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(Platform)
  category: Platform;

  @IsNotEmpty()
  @IsEnum(BoostAction)
  action: BoostAction;

  @IsNotEmpty()
  @IsString()
  targetUrl: string;

  @IsNotEmpty()
  @IsInt()
  amount: string;

  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
