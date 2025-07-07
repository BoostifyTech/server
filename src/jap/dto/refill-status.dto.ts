import { IsString } from 'class-validator';

export class RefillStatusDto {
  @IsString()
  refill: string;
}
