import { Controller, Get } from '@nestjs/common';
import { CheckHealthUseCase } from '../../application/use-cases/check-health.usecase';
import { HealthOutput } from '../../domain/types/health-output.types';

@Controller('health')
export class HealthController {
  constructor(private readonly checkHealth: CheckHealthUseCase) {}

  @Get()
  health(): HealthOutput {
    return this.checkHealth.execute();
  }
}
