import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as helmet from 'helmet'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService=app.get(ConfigService)
  const port=configService.get('PORT');
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
   app.use(helmet());
  //  app.enableCors();
   app.use(compression());
   await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
