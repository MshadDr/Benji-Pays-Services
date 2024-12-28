import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export function baseResponseDto<T>() {
  class BaseResponseDto {
    @IsNumber()
    statusCode: number;

    @IsBoolean()
    success: boolean;

    @IsString()
    message: string;

    @IsObject()
    @IsOptional()
    data?: T | T[];

    @IsString()
    @IsOptional()
    stack?: string;
  }
  return BaseResponseDto;
}
