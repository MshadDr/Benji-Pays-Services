import { Injectable } from '@nestjs/common';

import { MortgageCalculatorRequestDto } from 'src/mortgage/dtos/requests.dto/mortgage-calculator.request.dto';
import { MortgageResponseDto } from 'src/mortgage/dtos/responses.dto/mortgage.response.dto';
import { PaymentCalculatorUtils } from 'src/mortgage/utils/paymentCalculator/payment-calculator.utils';
import { PaymentStrategyFactory } from 'src/mortgage/utils/paymentCalculator/payment-strategy.factory';
import { MortgageHelper } from 'src/mortgage/helpers/mortgage.helper';

@Injectable()
export class MortgageCalculationService {
  constructor(private readonly mortgageHelper: MortgageHelper) {}
  /**
   * Calculate the mortgage based on the provided DTO.
   * @param mortgageCalculatorDto
   * @returns
   */
  async calculateMortgage(
    mortgageCalculatorDto: MortgageCalculatorRequestDto,
  ): Promise<MortgageResponseDto> {
    const {
      propertyPrice,
      downPayment,
      annualInterestRate,
      amortizationPeriod,
      paymentSchedule,
    } = mortgageCalculatorDto;

    const mortgageAmount = propertyPrice - downPayment;

    // Checking the validity of the down-payment.
    this.mortgageHelper.valdateDownPayment(downPayment, propertyPrice);

    const paymentSchedulePeriod =
      PaymentCalculatorUtils.determinePaymentSchedulePeriod(paymentSchedule);
    let ratePerPaymentPeriod = annualInterestRate / paymentSchedulePeriod;
    ratePerPaymentPeriod = parseFloat(ratePerPaymentPeriod.toFixed(6));

    const totalPaymentNumber = amortizationPeriod * paymentSchedulePeriod;

    const cmhcInsuranceRate = this.mortgageHelper.calculateCmhcInsuranceRate(
      downPayment,
      propertyPrice,
      amortizationPeriod,
    );

    const cmhcInsurance = cmhcInsuranceRate * mortgageAmount;
    const insuredMortgageAmount = mortgageAmount + cmhcInsurance;

    // Calculating the payment price for each period of payment
    const paymentStrategy = PaymentStrategyFactory.getStrategy(paymentSchedule);

    const payment = paymentStrategy.calculatePayment(
      insuredMortgageAmount,
      ratePerPaymentPeriod,
      totalPaymentNumber,
    );

    return {
      amortizationPeriod,
      paymentSchedule,
      payment,
      cmhcInsurance,
      insuredMortgageAmount,
    };
  }
}
