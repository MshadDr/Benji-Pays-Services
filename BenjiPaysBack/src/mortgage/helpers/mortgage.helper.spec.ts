import { MortgageHelper } from './mortgage.helper';

// Mock the constants in MortgageConfig
jest.mock('src/mortgage/configs/configs', () => ({
  ...jest.requireActual('src/mortgage/configs/configs'),
  MAX_PROPERTY_PRICE_1: 500000,
  MAX_PROPERTY_PRICE_2: 1000000,
  MIN_DOWN_PAYMENT_PERCENTAGE_1: 0.05,
  MIN_DOWN_PAYMENT_PERCENTAGE_2: 0.1,
  MIN_DOWN_PAYMENT_PERCENTAGE_3: 0.2,
  CMHC_RATE_1: 0.02,
  CMHC_RATE_2: 0.05,
  CMHC_RATE_3: 0.1,
  CMHC_RATE_4: 0.15,
  AMORTIZATION_PERIOD_LIMIT: 25,
  AMORTIZATION_PERIOD_EXTRA_RATIO: 0.01,
}));

describe('MortgageHelper', () => {
  let mortgageHelper: MortgageHelper;

  beforeEach(() => {
    mortgageHelper = new MortgageHelper();
  });

  describe('valdateDownPayment', () => {
    it('should not throw error if down payment is valid for a property under MAX_PROPERTY_PRICE_1', () => {
      const downPayment = 25000;
      const propertyPrice = 500000;

      expect(() => {
        mortgageHelper.valdateDownPayment(downPayment, propertyPrice);
      }).not.toThrow();
    });

    it('should throw error if down payment is too low for a property under MAX_PROPERTY_PRICE_1', () => {
      const downPayment = 20000;
      const propertyPrice = 500000;

      expect(() => {
        mortgageHelper.valdateDownPayment(downPayment, propertyPrice);
      }).toThrow(
        `Down payment is too low. Minimum required is $25000.00 for a property price of $500000.00.`,
      );
    });

    it('should correctly calculate the minimum down payment for a property under MAX_PROPERTY_PRICE_2', () => {
      const downPayment = 70000;
      const propertyPrice = 900000;

      expect(() => {
        mortgageHelper.valdateDownPayment(downPayment, propertyPrice);
      }).not.toThrow();
    });
  });

  describe('calculateCmhcInsuranceRate', () => {
    it('should return the correct CMHC rate for a down payment less than 10% of the property price', () => {
      const downPayment = 25000;
      const propertyPrice = 500000;
      const amortizationPeriod = 25;

      const cmhcRate = mortgageHelper.calculateCmhcInsuranceRate(
        downPayment,
        propertyPrice,
        amortizationPeriod,
      );

      expect(cmhcRate).toBe(0.04);
    });

    it('should return the correct CMHC rate for a down payment between 10% and 15%', () => {
      const downPayment = 75000;
      const propertyPrice = 1000000;
      const amortizationPeriod = 25;

      const cmhcRate = mortgageHelper.calculateCmhcInsuranceRate(
        downPayment,
        propertyPrice,
        amortizationPeriod,
      );

      expect(cmhcRate).toBe(0.04);
    });

    it('should return CMHC rate with extra ratio for amortization period greater than the limit', () => {
      const downPayment = 75000;
      const propertyPrice = 1000000;
      const amortizationPeriod = 30;

      const cmhcRate = mortgageHelper.calculateCmhcInsuranceRate(
        downPayment,
        propertyPrice,
        amortizationPeriod,
      );

      expect(cmhcRate).toBe(0.042);
    });
  });
});
