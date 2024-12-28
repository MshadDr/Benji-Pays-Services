import { Injectable } from '@nestjs/common';
import { MortgageConfig } from 'src/mortgage/configs/configs';

const {
  MAX_PROPERTY_PRICE_1,
  MAX_PROPERTY_PRICE_2,
  MIN_DOWN_PAYMENT_PERCENTAGE_1,
  MIN_DOWN_PAYMENT_PERCENTAGE_2,
  MIN_DOWN_PAYMENT_PERCENTAGE_3,
  CMHC_RATE_1,
  CMHC_RATE_2,
  CMHC_RATE_3,
  CMHC_RATE_4,
  AMORTIZATION_PERIOD_LIMIT,
  AMORTIZATION_PERIOD_EXTRA_RATIO,
} = MortgageConfig;

@Injectable()
export class MortgageHelper {
  /**
   * Check the minimum down payment amount
   * @param downPayment
   * @param propertyPrice
   */
  valdateDownPayment(downPayment: number, propertyPrice: number): void {
    let minimumDownPayment: number;

    if (propertyPrice <= MAX_PROPERTY_PRICE_1) {
      minimumDownPayment = propertyPrice * MIN_DOWN_PAYMENT_PERCENTAGE_1;
    } else if (propertyPrice <= MAX_PROPERTY_PRICE_2) {
      minimumDownPayment =
        MAX_PROPERTY_PRICE_1 * MIN_DOWN_PAYMENT_PERCENTAGE_1 +
        (propertyPrice - MAX_PROPERTY_PRICE_1) * MIN_DOWN_PAYMENT_PERCENTAGE_2;
    } else {
      minimumDownPayment = propertyPrice * MIN_DOWN_PAYMENT_PERCENTAGE_3;
    }

    if (downPayment < minimumDownPayment) {
      throw new Error(
        `Down payment is too low. Minimum required is $${minimumDownPayment.toFixed(2)} for a property price of $${propertyPrice.toFixed(2)}.`,
      );
    }
  }

  /**
   * Calculating the CMHC insurance amount
   * @param downPayment
   * @param propertyPrice
   * @param amortizationPeriod
   * @returns
   */
  calculateCmhcInsuranceRate(
    downPayment: number,
    propertyPrice: number,
    amortizationPeriod: number,
  ): number {
    const downPaymentRatio = (downPayment / propertyPrice) * 100;

    let cmhc;
    if (downPaymentRatio < 10) {
      cmhc = CMHC_RATE_4;
    } else if (downPaymentRatio < 15) {
      cmhc = CMHC_RATE_3;
    } else if (downPaymentRatio < 20) {
      cmhc = CMHC_RATE_2;
    } else if (downPaymentRatio >= 20) {
      cmhc = CMHC_RATE_1;
    }

    if (amortizationPeriod <= AMORTIZATION_PERIOD_LIMIT) {
      return cmhc;
    }
    return cmhc + AMORTIZATION_PERIOD_EXTRA_RATIO;
  }

  /**
   * Calculating down payments amount for the top table
   * @param minDownPaymentPercentage
   * @param minDownPayment
   * @param propertyPrice
   * @returns
   */
  calculateDownPaymentsAmounts(
    minDownPaymentPercentage: number,
    minDownPayment: number,
    propertyPrice: number,
  ): [number, number][] {
    const baseDownPaymentPercentage =
      minDownPaymentPercentage < MIN_DOWN_PAYMENT_PERCENTAGE_2
        ? MIN_DOWN_PAYMENT_PERCENTAGE_1
        : minDownPaymentPercentage;

    return [
      [minDownPaymentPercentage, parseFloat(minDownPayment.toFixed(2))],
      [
        parseFloat((baseDownPaymentPercentage + 0.05).toFixed(2)),
        parseFloat(
          (propertyPrice * (baseDownPaymentPercentage + 0.05)).toFixed(2),
        ),
      ],
      [
        parseFloat((baseDownPaymentPercentage + 0.1).toFixed(2)),
        parseFloat(
          (propertyPrice * (baseDownPaymentPercentage + 0.1)).toFixed(2),
        ),
      ],
      [
        parseFloat((baseDownPaymentPercentage + 0.15).toFixed(2)),
        parseFloat(
          (propertyPrice * (baseDownPaymentPercentage + 0.15)).toFixed(2),
        ),
      ],
    ];
  }

  /**
   * Calculating the minimum down payment for a property
   * @param propertyPrice
   * @returns
   */
  calcMinimumDownPayment(propertyPrice): {
    minDownPayment;
    minDownPaymentPercentage;
  } {
    let minDownPayment: number;
    let minDownPaymentPercentage: number;

    if (propertyPrice <= MAX_PROPERTY_PRICE_1) {
      minDownPaymentPercentage = MIN_DOWN_PAYMENT_PERCENTAGE_1;
      minDownPayment = minDownPaymentPercentage * propertyPrice;
    } else if (propertyPrice <= MAX_PROPERTY_PRICE_2) {
      minDownPayment =
        MIN_DOWN_PAYMENT_PERCENTAGE_1 * MAX_PROPERTY_PRICE_1 +
        (propertyPrice - MAX_PROPERTY_PRICE_1) * MIN_DOWN_PAYMENT_PERCENTAGE_2;

      minDownPaymentPercentage = parseFloat(
        (minDownPayment / propertyPrice).toFixed(3),
      );
    } else {
      minDownPaymentPercentage = MIN_DOWN_PAYMENT_PERCENTAGE_3;
      minDownPayment = minDownPaymentPercentage * propertyPrice;
    }

    return {
      minDownPayment,
      minDownPaymentPercentage,
    };
  }
}
