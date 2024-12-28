import { Type } from 'class-transformer';
import { IsEnum, IsNumber, Min } from 'class-validator';

import { PaymentSchedule } from 'src/mortgage/enums/index';

export class MortgageCalculatorRequestDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  propertyPrice: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  downPayment: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  annualInterestRate: number;

  @IsNumber()
  @Min(5)
  @Type(() => Number)
  amortizationPeriod: number;

  @IsEnum(PaymentSchedule)
  paymentSchedule: PaymentSchedule;
}
