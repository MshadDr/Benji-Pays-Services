import { Test, TestingModule } from '@nestjs/testing';
import { MortgageCalculationService } from './mortgage-calculation.service';
import { MortgageHelper } from 'src/mortgage/helpers/mortgage.helper';
import { PaymentCalculatorUtils } from 'src/mortgage/utils/paymentCalculator/payment-calculator.utils';
import { PaymentStrategyFactory } from 'src/mortgage/utils/paymentCalculator/payment-strategy.factory';
import { MortgageCalculatorRequestDto } from 'src/mortgage/dtos/requests.dto/mortgage-calculator.request.dto';
import { MortgageResponseDto } from 'src/mortgage/dtos/responses.dto/mortgage.response.dto';
import { PaymentSchedule } from '../enums';

describe('MortgageCalculationService', () => {
  let service: MortgageCalculationService;
  let mortgageHelperMock: jest.Mocked<MortgageHelper>;
  let paymentCalculatorUtilsSpy: jest.SpyInstance;
  let paymentStrategyFactorySpy: jest.SpyInstance;

  beforeEach(async () => {
    // Mocking the MortgageHelper methods
    mortgageHelperMock = {
      valdateDownPayment: jest.fn(),
      calculateCmhcInsuranceRate: jest.fn().mockReturnValue(0.04),
      calculateDownPaymentsAmounts: jest.fn(),
      calcMinimumDownPayment: jest.fn(),
    };

    paymentCalculatorUtilsSpy = jest
      .spyOn(PaymentCalculatorUtils, 'determinePaymentSchedulePeriod')
      .mockReturnValue(12);

    paymentStrategyFactorySpy = jest
      .spyOn(PaymentStrategyFactory, 'getStrategy')
      .mockReturnValue({
        calculatePayment: jest.fn().mockReturnValue(2635),
      });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MortgageCalculationService,
        { provide: MortgageHelper, useValue: mortgageHelperMock },
        { provide: PaymentCalculatorUtils, useValue: PaymentCalculatorUtils },
        { provide: PaymentStrategyFactory, useValue: PaymentStrategyFactory },
      ],
    }).compile();

    service = module.get<MortgageCalculationService>(
      MortgageCalculationService,
    );
  });

  it('should calculate the mortgage correctly', async () => {
    const mortgageCalculatorDto: MortgageCalculatorRequestDto = {
      propertyPrice: 500000,
      downPayment: 25000,
      annualInterestRate: 0.041,
      amortizationPeriod: 25,
      paymentSchedule: PaymentSchedule.MONTHLY,
    };

    const result: MortgageResponseDto = await service.calculateMortgage(
      mortgageCalculatorDto,
    );

    expect(result).toEqual({
      amortizationPeriod: 25,
      paymentSchedule: 'monthly',
      payment: 2635,
      cmhcInsurance: 19000,
      insuredMortgageAmount: 494000,
    });

    // Additional checks on mocks
    expect(mortgageHelperMock.valdateDownPayment).toHaveBeenCalledWith(
      25000,
      500000,
    );
    expect(mortgageHelperMock.calculateCmhcInsuranceRate).toHaveBeenCalledWith(
      25000,
      500000,
      25,
    );
    expect(paymentCalculatorUtilsSpy).toHaveBeenCalledWith('monthly');
    expect(paymentStrategyFactorySpy).toHaveBeenCalledWith('monthly');
  });
});
