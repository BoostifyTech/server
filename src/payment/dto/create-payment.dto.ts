import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { OrderStatus } from '@prisma/client';

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
  @IsString()
  targetUrl: string;

  @IsNotEmpty()
  @IsNumber()
  serviceId: number; // Added missing property

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number; // Added missing property

  @IsNotEmpty()
  @IsString() // or @IsNumber() depending on your use case
  amount: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
