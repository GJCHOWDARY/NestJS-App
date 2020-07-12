import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService:ConfigService) {}
 IP=this.configService.get('IP');
 PORT=this.configService.get('PORT')

  getHello(): string {
    return `<center>Hi.... <br/><br/><b>For API Reference (Swagger) : <a href="http://${this.IP}:${this.PORT}/api/#/">http://${this.IP}:${this.PORT}/api/ </a></b></center>`
  }
}
