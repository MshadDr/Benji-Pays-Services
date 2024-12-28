import {
  MonthlyPaymentStrategy,
  BiWeeklyPaymentStrategy,
  AcceleratedBiWeeklyPaymentStrategy,
} from 'src/mortgage/utils/paymentCalculator/payment-strategy-classes';

describe('MonthlyPaymentStrategy', () => {
  const insuredMortgageAmount = 300000;
  const ratePerPaymentPeriod = 0.0025;
  const totalPaymentNumber = 360;

  it('should correctly calculate the monthly payment', () => {
    const strategy = new MonthlyPaymentStrategy();
    const payment = strategy.calculatePayment(
      insuredMortgageAmount,
      ratePerPaymentPeriod,
      totalPaymentNumber,
    );

    expect(payment).toBeGreaterThan(0);
  });
});

describe('BiWeeklyPaymentStrategy', () => {
  const insuredMortgageAmount = 300000;
  const ratePerPaymentPeriod = 0.0025;
  const totalPaymentNumber = 360;

  it('should correctly calculate the bi-weekly payment', () => {
    const strategy = new BiWeeklyPaymentStrategy();
    const payment = strategy.calculatePayment(
      insuredMortgageAmount,
      ratePerPaymentPeriod,
      totalPaymentNumber,
    );

    expect(payment).toBeGreaterThan(0);
  });
});

describe('AcceleratedBiWeeklyPaymentStrategy', () => {
  const insuredMortgageAmount = 300000;
  const ratePerPaymentPeriod = 0.0025;
  const totalPaymentNumber = 360;

  it('should correctly calculate the accelerated bi-weekly payment', () => {
    const strategy = new AcceleratedBiWeeklyPaymentStrategy();
    const payment = strategy.calculatePayment(
      insuredMortgageAmount,
      ratePerPaymentPeriod,
      totalPaymentNumber,
    );

    expect(payment).toBeGreaterThan(0);
  });
});
