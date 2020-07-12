import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<center>Hi.... <br/><br/><b>For API Reference (Swagger) : <a href="http://localhost:3000/api/#/">http://localhost:3000/api/ </a></b></center>`
  }
}
