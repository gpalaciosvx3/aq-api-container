import { Injectable } from '@nestjs/common';
import { HealthConstants } from '../constants/health.constants';
import { HealthOutput } from '../types/health-output.types';

@Injectable()
export class HealthService {
  check(): HealthOutput {
    return {
      status: HealthConstants.STATUS_OK,
      uptimeSeconds: Math.floor(process.uptime()),
    };
  }
}
