import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksModule } from './links/links.module';
import { HttpErrorFilter } from './middleware/error-handler';
import { RequestInterceptor } from './middleware/request-interceptor';
import { LinksService } from './links/links.service';
import { LinkSchema } from './links/links.model'
import { from } from 'rxjs';
import { AuthGuard } from './middleware/auth.guard';
import { RequestModule } from './request/request.module';
import { RequestService } from './request/request.service';
import { RequestSchema } from './request/request.model';

@Module({
  imports: [
    LinksModule,
    RequestModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'Links', schema: LinkSchema }]),
    MongooseModule.forFeature([{ name: 'Requests', schema: RequestSchema }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LinksService,
    RequestService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {
}
