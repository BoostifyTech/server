import { IsString } from 'class-validator';

export class RefillDto {
  @IsString()
  order: string;
}
