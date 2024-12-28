import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { baseResponseDto } from 'src/base/dto/response/base.response.dto';

export class DownPaymentResponseDto extends baseResponseDto<
  Array<[number, number]>
>() {
  @IsOptional()
  @IsArray()
  @IsArray({ each: true })
  @IsNumber({}, { each: true })
  data?: Array<[number, number]>;
}
