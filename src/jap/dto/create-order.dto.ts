import { IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  service: number;

  @IsString()
  link: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
