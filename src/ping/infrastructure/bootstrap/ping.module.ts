import { Module } from '@nestjs/common';
import { PingUseCase } from '../../application/use-cases/ping.usecase';
import { PingService } from '../../domain/service/ping.service';
import { PingController } from '../controller/ping.controller';

@Module({
  controllers: [PingController],
  providers: [
    { provide: PingService, useFactory: () => new PingService() },
    {
      provide: PingUseCase,
      useFactory: (service: PingService) => new PingUseCase(service),
      inject: [PingService],
    },
  ],
})
export class PingModule {}
