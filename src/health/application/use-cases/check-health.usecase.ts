import { Injectable } from '@nestjs/common';
import { HealthService } from '../../domain/service/health.service';
import type { HealthOutput } from '../../domain/types/health-output.types';

@Injectable()
export class CheckHealthUseCase {
  constructor(private readonly service: HealthService) {}

  execute(): HealthOutput {
    return this.service.check();
  }
}
