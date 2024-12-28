import { HttpStatus } from '@nestjs/common';

import { Test, TestingModule } from '@nestjs/testing';
import { MortgageController } from './mortgage.controller';
import { MortgageCalculationService } from './services/mortgage-calculation.service';
import { DownPaymentService } from './services/down-payment.service';
import { PaymentSchedule } from 'src/mortgage/enums';
import { MortgageCalculatorRequestDto } from 'src/mortgage/dtos/requests.dto/mortgage-calculator.request.dto';

// Mock Service
const mockMortgageCalculationService = {
  calculateMortgage: jest.fn(),
};

const mockDownPaymentService = {
  calculateDownPayment: jest.fn(),
};

describe('MortgageController', () => {
  let controller: MortgageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MortgageController],
      providers: [
        {
          provide: MortgageCalculationService,
          useValue: mockMortgageCalculationService,
        },
        { provide: DownPaymentService, useValue: mockDownPaymentService },
      ],
    }).compile();

    controller = module.get<MortgageController>(MortgageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('calculateMortgage', () => {
    it('should return a successful response when correct parameters are provided', async () => {
      const mortgageRequestDto: MortgageCalculatorRequestDto = {
        propertyPrice: 500000,
        downPayment: 100000,
        annualInterestRate: 3.5,
        amortizationPeriod: 25,
        paymentSchedule: PaymentSchedule.MONTHLY,
      };

      const mockResponse = {
        amortizationPeriod: 25,
        paymentSchedule: PaymentSchedule.MONTHLY,
        payment: 2000,
        cmhcInsurance: 5000,
        insuredMortgageAmount: 450000,
      };

      mockMortgageCalculationService.calculateMortgage.mockResolvedValue(
        mockResponse,
      );

      const result = await controller.calculateMortgage({
        ...mortgageRequestDto,
      });

      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Request is successful');
      expect(result.data).toEqual(mockResponse);
    });

    it('should return an error response when an invalid payment schedule is provided', async () => {
      const mortgageRequestDto: MortgageCalculatorRequestDto = {
        propertyPrice: 500000,
        downPayment: 100000,
        annualInterestRate: 3.5,
        amortizationPeriod: 25,
        paymentSchedule: 'invalid-schedule' as PaymentSchedule,
      };

      mockMortgageCalculationService.calculateMortgage.mockRejectedValue(
        new Error('Invalid payment schedule'),
      );

      const result = await controller.calculateMortgage({
        ...mortgageRequestDto,
      });

      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid payment schedule');
    });
  });
});
