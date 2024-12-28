import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class DownPaymentCalculatorDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  propertyPrice: number;
}
