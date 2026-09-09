import { Injectable } from '@nestjs/common';
import { getLogger } from '@gpalacios/core';
import { PingConstants } from '../constants/ping.constants';
import { PingInput } from '../types/ping-input.types';
import { PingOutput } from '../types/ping-output.types';

@Injectable()
export class PingService {
  pong(input: PingInput): PingOutput {
    getLogger().step(1, 'Generando respuesta pong', { echo: input.message });

    return {
      message: PingConstants.PONG_MESSAGE,
      echo: input.message,
      receivedAt: new Date().toISOString(),
    };
  }
}
