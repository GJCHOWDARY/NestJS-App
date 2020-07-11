import {
  Injectable,
  NestInterceptor,
  CallHandler,
  Logger,
  ExecutionContext,
  HttpException,
  HttpStatus
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';
import { Request } from 'supertest';
import { RequestService } from '../request/request.service';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService, private requestService: RequestService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const headers = req.headers
    const referrer = req.url;
    const ip = req.ip;
    const user_agent = headers['user-agent'];
    this.requestService.newRequest(user_agent, headers, referrer, ip, method, 'log',{})
    if (req) {
      if (!req.headers.authorization) {
        req.user = {
          whitelabelHost: this.configService.get('WHITE_LABEL_HOST'),
          whitelabelSecret: this.configService.get('WHITE_LABEL_SECRET'),
          temp_user: true
        }
      } else {
        let token = req.headers.authorization.split(' ');
        if (token[0] !== 'Bearer') {
          throw new HttpException('Invalid token!', HttpStatus.UNAUTHORIZED);
        }
        let data = token[1].split(':');
        req.user = {
          whitelabelHost: data[0],
          whitelabelSecret: data[1],
          temp_user: false
        };
      }
      return next
        .handle()
        .pipe(
          tap(() => Logger.log(
            `${method} ${referrer} ${Date.now() - now}ms`,
            context.getClass().name,
          )
          ),
        );
    }
  }
}