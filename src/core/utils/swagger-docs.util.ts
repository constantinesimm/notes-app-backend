import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { version } from '../../../package.json';

export const setupSwaggerDocumentModule = (
  app: INestApplication<any>,
): void => {
  const config = new DocumentBuilder()
    .setTitle('Notes App')
    .setDescription('Web application for storing and organizing notes')
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
};
