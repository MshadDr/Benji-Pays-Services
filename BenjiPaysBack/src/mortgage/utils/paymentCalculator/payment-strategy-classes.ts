import { PaymentScheduleStrategy } from 'src/mortgage/utils/paymentCalculator/iPayment-calculator-strategy';

export class MonthlyPaymentStrategy implements PaymentScheduleStrategy {
  calculatePayment(
    insuredMortgageAmount: number,
    ratePerPaymentPeriod: number,
    totalPaymentNumber: number,
  ): number {
    return Math.round(
      (insuredMortgageAmount *
        ratePerPaymentPeriod *
        Math.pow(1 + ratePerPaymentPeriod, totalPaymentNumber)) /
        (Math.pow(1 + ratePerPaymentPeriod, totalPaymentNumber) - 1),
    );
  }
}

export class BiWeeklyPaymentStrategy implements PaymentScheduleStrategy {
  calculatePayment(
    insuredMortgageAmount: number,
    ratePerPaymentPeriod: number,
    totalPaymentNumber: number,
  ): number {
    return Math.round(
      (insuredMortgageAmount *
        ratePerPaymentPeriod *
        Math.pow(1 + ratePerPaymentPeriod, totalPaymentNumber)) /
        (Math.pow(1 + ratePerPaymentPeriod, totalPaymentNumber) - 1),
    );
  }
}

export class AcceleratedBiWeeklyPaymentStrategy
  implements PaymentScheduleStrategy
{
  calculatePayment(
    insuredMortgageAmount: number,
    ratePerPaymentPeriod: number,
    totalPaymentNumber: number,
  ): number {
    const biWeeklyPaymentNumber = 26 * (totalPaymentNumber / (12 * 26));
    return Math.round(
      (insuredMortgageAmount *
        ratePerPaymentPeriod *
        Math.pow(1 + ratePerPaymentPeriod, biWeeklyPaymentNumber)) /
        (Math.pow(1 + ratePerPaymentPeriod, biWeeklyPaymentNumber) - 1),
    );
  }
}
