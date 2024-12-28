import { Module } from '@nestjs/common';
import { MortgageCalculationService } from 'src/mortgage/services/mortgage-calculation.service';
import { DownPaymentService } from 'src/mortgage/services/down-payment.service';
import { MortgageController } from 'src/mortgage/mortgage.controller';
import { MortgageHelper } from 'src/mortgage/helpers/mortgage.helper';

@Module({
  controllers: [MortgageController],
  providers: [MortgageCalculationService, DownPaymentService, MortgageHelper],
})
export class MortgageModule {}
