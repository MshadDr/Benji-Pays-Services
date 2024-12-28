import { Module } from '@nestjs/common';
import { MortgageModule } from './mortgage/mortgage.module';
import { HealthController } from './base/health.controller';

@Module({
  imports: [MortgageModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
