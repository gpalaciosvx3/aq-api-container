import { ServerConstants } from '../constants/server.constants';

export const envConfig = {
  port: Number(process.env.PORT ?? ServerConstants.DEFAULT_PORT),
  host: process.env.HOST ?? ServerConstants.DEFAULT_HOST,
} as const;
