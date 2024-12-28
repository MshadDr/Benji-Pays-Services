export interface PaymentScheduleStrategy {
  calculatePayment(
    insuredMortgageAmount: number,
    ratePerPaymentPeriod: number,
    totalPaymentNumber: number,
  ): number;
}
