import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import {
  setupSwaggerDocumentModule,
  checkOrCreateUploadsDir,
} from './core/utils';

dotenv.config();

const APP_PORT: number = parseInt(process.env.NODE_PORT) || 3000;
async function bootstrap(): Promise<void> {
  await checkOrCreateUploadsDir();
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    preflightContinue: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  setupSwaggerDocumentModule(app);

  await app.listen(APP_PORT);
}
bootstrap().catch((err): void =>
  console.log(
    `Something went wrong. App not started with error ${JSON.stringify(err)}`,
  ),
);
