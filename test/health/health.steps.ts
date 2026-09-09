import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { ResponseInterceptor } from '../../src/common/interceptors/response.interceptor';
import { HealthModule } from '../../src/health/infrastructure/bootstrap/health.module';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';

const feature = loadFeature('./test/health/features/health.feature');

defineFeature(feature, (test) => {
  let app: NestFastifyApplication;
  let httpResponse: { statusCode: number; body: string };

  afterEach(async () => {
    if (app) await app.close();
  });

  test('Reporta el estado del servicio', ({ given, when, then, and }) => {
    given('la aplicacion levantada', async () => {
      const moduleRef = await Test.createTestingModule({ imports: [HealthModule] }).compile();
      app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
      app.useGlobalInterceptors(new ResponseInterceptor());
      await app.init();
      await app.getHttpAdapter().getInstance().ready();
    });

    when(/^se consulta GET "(.*)"$/, async (ruta: string) => {
      httpResponse = await app.inject({ method: 'GET', url: ruta });
    });

    then(/^el status code es (\d+)$/, (esperado: string) => {
      expect(httpResponse.statusCode).toBe(Number(esperado));
    });

    and(/^el estado reportado es "(.*)"$/, (esperado: string) => {
      expect(JSON.parse(httpResponse.body).data.status).toBe(esperado);
    });

    and('el uptime reportado no es negativo', () => {
      expect(JSON.parse(httpResponse.body).data.uptimeSeconds).toBeGreaterThanOrEqual(0);
    });
  });
});
