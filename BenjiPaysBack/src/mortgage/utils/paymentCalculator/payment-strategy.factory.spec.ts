import { PaymentStrategyFactory } from 'src/mortgage/utils/paymentCalculator/payment-strategy.factory';
import { PaymentSchedule } from 'src/mortgage/enums';
import { MonthlyPaymentStrategy } from 'src/mortgage/utils/paymentCalculator/payment-strategy-classes';
import { BiWeeklyPaymentStrategy } from 'src/mortgage/utils/paymentCalculator/payment-strategy-classes';
import { AcceleratedBiWeeklyPaymentStrategy } from 'src/mortgage/utils/paymentCalculator/payment-strategy-classes';

describe('PaymentStrategyFactory', () => {
  it('should return a MonthlyPaymentStrategy for monthly payment schedule', () => {
    const strategy = PaymentStrategyFactory.getStrategy(
      PaymentSchedule.MONTHLY,
    );
    expect(strategy).toBeInstanceOf(MonthlyPaymentStrategy);
  });

  it('should return a BiWeeklyPaymentStrategy for bi-weekly payment schedule', () => {
    const strategy = PaymentStrategyFactory.getStrategy(
      PaymentSchedule.BI_WEEKLY,
    );
    expect(strategy).toBeInstanceOf(BiWeeklyPaymentStrategy);
  });

  it('should return an AcceleratedBiWeeklyPaymentStrategy for accelerated bi-weekly payment schedule', () => {
    const strategy = PaymentStrategyFactory.getStrategy(
      PaymentSchedule.ACCELERATED_BI_WEEKLY,
    );
    expect(strategy).toBeInstanceOf(AcceleratedBiWeeklyPaymentStrategy);
  });

  it('should throw an error for unsupported payment schedule', () => {
    expect(() =>
      PaymentStrategyFactory.getStrategy('INVALID' as any),
    ).toThrowError('Unsupported payment schedule');
  });
});
