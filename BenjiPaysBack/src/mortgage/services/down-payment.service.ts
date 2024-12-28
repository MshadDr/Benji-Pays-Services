import { Injectable } from '@nestjs/common';

import { DownPaymentCalculatorDto } from 'src/mortgage/dtos/requests.dto/down-payment-calculator.request.dto';
import { MortgageHelper } from 'src/mortgage/helpers/mortgage.helper';

@Injectable()
export class DownPaymentService {
  constructor(private readonly mortgageHelper: MortgageHelper) {}
  /**
   * Calculate the down payment based on the property price.
   * @param downPaymentCalculatorDto.
   * @returns
   */
  async calculateDownPayment(
    downPaymentCalculatorDto: DownPaymentCalculatorDto,
  ): Promise<Array<[number, number]>> {
    const { propertyPrice } = downPaymentCalculatorDto;

    // Define minimum down-payment Percentage and Price.
    const { minDownPayment, minDownPaymentPercentage } =
      this.mortgageHelper.calcMinimumDownPayment(propertyPrice);

    return this.mortgageHelper.calculateDownPaymentsAmounts(
      minDownPaymentPercentage,
      minDownPayment,
      propertyPrice,
    );
  }
}
