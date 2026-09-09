import { Module } from '@nestjs/common';
import { HealthService } from '../../domain/service/health.service';
import { CheckHealthUseCase } from '../../application/use-cases/check-health.usecase';
import { HealthController } from '../controller/health.controller';

@Module({
  controllers: [HealthController],
  providers: [
    { provide: HealthService, useFactory: () => new HealthService() },
    {
      provide: CheckHealthUseCase,
      useFactory: (service: HealthService) => new CheckHealthUseCase(service),
      inject: [HealthService],
    },
  ],
})
export class HealthModule {}
