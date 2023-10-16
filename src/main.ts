import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap().catch((err): void =>
  console.log(
    `Something went wrong. App not started with error ${JSON.stringify(err)}`,
  ),
);
