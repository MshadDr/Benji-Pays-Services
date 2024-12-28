import { PaymentSchedule } from 'src/mortgage/enums';

export class PaymentCalculatorUtils {
  static determinePaymentSchedulePeriod(
    paymentSchedule: PaymentSchedule,
  ): number {
    switch (paymentSchedule) {
      case PaymentSchedule.MONTHLY:
        return 12;
      case PaymentSchedule.BI_WEEKLY:
      case PaymentSchedule.ACCELERATED_BI_WEEKLY:
        return 26;
      default:
        throw new Error('Unsupported payment schedule');
    }
  }
}
