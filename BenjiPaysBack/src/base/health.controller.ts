import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HealthCheckResponse } from './dto/response/health.response.dto';

@Controller('health')
export class HealthController {
  @Get()
  health(): HealthCheckResponse {
    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'health is ok...',
      data: null,
    };
  }
}
