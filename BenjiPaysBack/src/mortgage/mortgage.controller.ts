import {
  Controller,
  HttpStatus,
  Get,
  Query,
  Version,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MortgageCalculatorRequestDto } from 'src/mortgage/dtos/requests.dto/mortgage-calculator.request.dto';
import { MortgageCalculatorResponseDto } from 'src/mortgage/dtos/responses.dto/mortgage-calculator.response.dto';
import { DownPaymentCalculatorDto } from 'src/mortgage/dtos/requests.dto/down-payment-calculator.request.dto';
import { DownPaymentResponseDto } from 'src/mortgage/dtos/responses.dto/down-payment.response.dto';
import { MortgageCalculationService } from './services/mortgage-calculation.service';
import { DownPaymentService } from './services/down-payment.service';

@Controller('mortgage')
export class MortgageController {
  constructor(
    private readonly mortgageCalculationService: MortgageCalculationService,
    private readonly downPaymentService: DownPaymentService,
  ) {}

  @Version('1')
  @Get('calculate-mortgage')
  @UsePipes(new ValidationPipe({ transform: true }))
  async calculateMortgage(
    @Query() mortgageCalculatorRequestDto: MortgageCalculatorRequestDto,
  ): Promise<MortgageCalculatorResponseDto> {
    try {
      const data = await this.mortgageCalculationService.calculateMortgage(
        mortgageCalculatorRequestDto,
      );
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Request is successful',
        data: data,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        success: false,
        message:
          process.env.NODE_ENV === 'production'
            ? 'An error occurred while processing your request'
            : error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
      };
    }
  }

  @Version('1')
  @Get('calculate-down-payment')
  @UsePipes(new ValidationPipe({ transform: true }))
  async calculateDownPayment(
    @Query() downPaymentCalculatorDto: DownPaymentCalculatorDto,
  ): Promise<DownPaymentResponseDto> {
    try {
      const data = await this.downPaymentService.calculateDownPayment(
        downPaymentCalculatorDto,
      );
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Down payment calculation successful',
        data: data,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        success: false,
        message:
          process.env.NODE_ENV === 'production'
            ? 'An error occurred while processing your request'
            : error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
      };
    }
  }
}
