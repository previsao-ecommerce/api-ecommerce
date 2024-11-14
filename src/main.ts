import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/webhook/stripe', express.raw({ type: 'application/json' }));

  // Configuração de CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Authorization,Origin,X-Requested-With,Content-Type,Accept',
  });

  await app.listen(8080);
}
bootstrap();
