import { IsNumber, IsString } from 'class-validator';
import { PaymentSchedule } from 'src/mortgage/enums';

export class MortgageResponseDto {
  @IsNumber()
  amortizationPeriod: number;

  @IsString()
  paymentSchedule: PaymentSchedule;

  @IsNumber()
  payment: number;

  @IsNumber()
  cmhcInsurance: number;

  @IsNumber()
  insuredMortgageAmount: number;
}
