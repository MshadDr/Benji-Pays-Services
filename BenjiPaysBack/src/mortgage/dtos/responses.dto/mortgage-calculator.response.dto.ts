import { IsObject, IsOptional } from 'class-validator';
import { baseResponseDto } from 'src/base/dto/response/base.response.dto';

export class MortgageCalculatorResponseDto extends baseResponseDto<object>() {
  @IsObject()
  @IsOptional()
  data?: object;
}
