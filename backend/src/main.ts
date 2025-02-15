import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Environment } from './common/constants/environment';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('TalkQuarium API')
    .setDescription('API documentation for the Talkquarium backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(Environment.APP_PORT(), Environment.APP_HOSTNAME());

  console.info(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
