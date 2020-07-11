import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CallMicroServices {
  private Tcpclient: ClientProxy;
  private Redisclient: ClientProxy;

  constructor() {
    this.Tcpclient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    });

    this.Redisclient= ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });
  }

  public saveData(data: any) {
    return this.Tcpclient.send('add', data);
  }

  public getData() {
    return this.Tcpclient.send('get', '');
  }
  
  public CallAdminMicroservices() {
    return this.Tcpclient.send('get_micro_user', '');
  }

  public getDataByEvent() {
    return this.Tcpclient.emit('event', '');
  }
  
  public saveDataRedis(data: any) {
    return this.Redisclient.send('add', data);
  }

  public getDataRedis() {
    return this.Redisclient.send('get', '');
  }
}
