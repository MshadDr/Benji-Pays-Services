import { PaymentCalculatorUtils } from 'src/mortgage/utils/paymentCalculator/payment-calculator.utils';
import { PaymentSchedule } from 'src/mortgage/enums';

describe('PaymentCalculatorUtils', () => {
  describe('determinePaymentSchedulePeriod', () => {
    it('should return 12 for monthly payments', () => {
      const result = PaymentCalculatorUtils.determinePaymentSchedulePeriod(
        PaymentSchedule.MONTHLY,
      );
      expect(result).toBe(12);
    });

    it('should return 26 for bi-weekly payments', () => {
      const result = PaymentCalculatorUtils.determinePaymentSchedulePeriod(
        PaymentSchedule.BI_WEEKLY,
      );
      expect(result).toBe(26);
    });

    it('should return 26 for accelerated bi-weekly payments', () => {
      const result = PaymentCalculatorUtils.determinePaymentSchedulePeriod(
        PaymentSchedule.ACCELERATED_BI_WEEKLY,
      );
      expect(result).toBe(26);
    });

    it('should throw an error for unsupported payment schedules', () => {
      expect(() =>
        PaymentCalculatorUtils.determinePaymentSchedulePeriod('INVALID' as any),
      ).toThrowError('Unsupported payment schedule');
    });
  });
});
