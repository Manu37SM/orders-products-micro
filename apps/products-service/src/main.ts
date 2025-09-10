import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('products-service')
    .setDescription('products-service API')
    .setVersion('1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, {});
  SwaggerModule.setup('docs', app, doc);

  await app.listen(3001);
  console.log('products-service listening on 3001');
}
bootstrap();
