import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('NestJS APP')
    .setDescription(`Links API's`)
    .setVersion('1.0')
    .addTag('NestJS')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService)
  const port = configService.get('PORT');

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // To limit each IP to 100 requests per windowMs
    }),
  );

  app.use(helmet());
  //  app.enableCors();
  app.use(compression());
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
