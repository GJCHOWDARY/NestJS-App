import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    Logger,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
import { RequestService } from '../request/request.service';

  @Catch()
  export class HttpErrorFilter implements ExceptionFilter {
    constructor(private requestService: RequestService) { }

    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const errorResponse = {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message:
          status !== HttpStatus.INTERNAL_SERVER_ERROR
            ?  exception.message || null
            : 'Internal server error',
      }; 
      console.log(request.headers['user-agent'])
      this.requestService.newRequest(request.headers['user-agent'], 
        request.headers, 
        request.url, 
        request.ip, 
        request.method, 'error', errorResponse)

      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        Logger.error(
          `${request.method} ${request.url}`,
          exception.stack,
          'ExceptionFilter',
        );
      } else {
        Logger.error(
          `${request.method} ${request.url}`,
          JSON.stringify(errorResponse),
          'ExceptionFilter',
        );
      }
  
      response.status(status).json(errorResponse);
    }
  }