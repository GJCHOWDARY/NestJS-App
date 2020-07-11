import { Controller, Get, Post, Delete, Put, Body, Param, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { CallMicroServices } from './call.micro.services';

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(
    private readonly appService: AppService,
    private configService:ConfigService,
    private callMicroServices:CallMicroServices
    ) {}

  @Get()
  async getHello() {
     return this.appService.getHello();
  }

  @Post('tcp_microservice')
  async PostTcpMicroServices(@Body('data') data:any)  {
    return this.callMicroServices.saveData(data); 
  }

  @Get('tcp_microservice')
  async callTcpMicroServices()  {
    return this.callMicroServices.getData(); 
  }

  @Get('tcp_microservice1')
  async callTcpMicroServices1(@Param('id') id: string)  {
    return this.callMicroServices.getData(); 
  }

  @Get('cal_multiple_microservices')
  async CallAdminMicroservices(@Param('id') id: string)  {
    return this.callMicroServices.CallAdminMicroservices(); 
  }

  @Get('tcp_microservice_event')
  async callTcpEventMicroServices()  {
    this.callMicroServices.getDataByEvent();
    return 'Calling by Event done!'
  }

  @Get('redis_microservice')
  async callRedisMicroServices(@Body('data') data:any)  {
    return this.callMicroServices.saveDataRedis(data); 
  }
  
  @Get('redis_microservice')
  async callRedisMicroServices1()  {
    return this.callMicroServices.getDataRedis(); 
  }

  @Get('grpc_microservice')
  async callGrpcMicroServices(@Body('data') data:any)  {
    return this.callMicroServices.saveDataRedis(data); 
  }
  
  @Get('grpc_microservice')
  async callGrpcMicroServices1()  {
    return this.callMicroServices.getDataRedis(); 
  }
}
