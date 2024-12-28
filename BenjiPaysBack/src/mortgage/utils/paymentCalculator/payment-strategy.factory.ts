import { PaymentSchedule } from 'src/mortgage/enums';
import { PaymentScheduleStrategy } from 'src/mortgage/utils/paymentCalculator/iPayment-calculator-strategy';
import {
  MonthlyPaymentStrategy,
  BiWeeklyPaymentStrategy,
  AcceleratedBiWeeklyPaymentStrategy,
} from 'src/mortgage/utils/paymentCalculator/payment-strategy-classes';

export class PaymentStrategyFactory {
  static getStrategy(
    paymentSchedule: PaymentSchedule,
  ): PaymentScheduleStrategy {
    switch (paymentSchedule) {
      case PaymentSchedule.MONTHLY:
        return new MonthlyPaymentStrategy();
      case PaymentSchedule.BI_WEEKLY:
        return new BiWeeklyPaymentStrategy();
      case PaymentSchedule.ACCELERATED_BI_WEEKLY:
        return new AcceleratedBiWeeklyPaymentStrategy();
      default:
        throw new Error('Unsupported payment schedule');
    }
  }
}
