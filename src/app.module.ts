import { Module } from '@nestjs/common';
import { HealthModule } from './health/infrastructure/bootstrap/health.module';
import { PingModule } from './ping/infrastructure/bootstrap/ping.module';

@Module({
  imports: [HealthModule, PingModule],
})
export class AppModule {}
