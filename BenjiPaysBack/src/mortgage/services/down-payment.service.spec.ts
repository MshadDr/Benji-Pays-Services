import { Test, TestingModule } from '@nestjs/testing';
import { DownPaymentService } from './down-payment.service';
import { MortgageHelper } from 'src/mortgage/helpers/mortgage.helper';
import { DownPaymentCalculatorDto } from 'src/mortgage/dtos/requests.dto/down-payment-calculator.request.dto';

describe('DownPaymentService', () => {
  let service: DownPaymentService;
  let mortgageHelper: MortgageHelper;

  beforeEach(async () => {
    // Mock the MortgageHelper
    const mockMortgageHelper = {
      calcMinimumDownPayment: jest.fn().mockReturnValue({
        minDownPayment: 10000,
        minDownPaymentPercentage: 0.2,
      }),
      calculateDownPaymentsAmounts: jest.fn().mockReturnValue([
        [10000, 0.2],
        [15000, 0.3],
      ]),
    };

    // Create a testing module and inject the mock for the MortgageHelper
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DownPaymentService,
        { provide: MortgageHelper, useValue: mockMortgageHelper },
      ],
    }).compile();

    service = module.get<DownPaymentService>(DownPaymentService);
    mortgageHelper = module.get<MortgageHelper>(MortgageHelper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate down payment correctly', async () => {
    const downPaymentCalculatorDto: DownPaymentCalculatorDto = {
      propertyPrice: 50000,
    };

    const result = await service.calculateDownPayment(downPaymentCalculatorDto);

    // Assert the expected values
    expect(result).toEqual([
      [10000, 0.2],
      [15000, 0.3],
    ]);

    // Check if helper methods were called with correct arguments
    expect(mortgageHelper.calcMinimumDownPayment).toHaveBeenCalledWith(
      downPaymentCalculatorDto.propertyPrice,
    );
    expect(mortgageHelper.calculateDownPaymentsAmounts).toHaveBeenCalledWith(
      0.2,
      10000,
      downPaymentCalculatorDto.propertyPrice,
    );
  });
});
