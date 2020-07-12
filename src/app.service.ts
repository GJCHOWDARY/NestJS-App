import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hi.... <br/><b>API Reference Visit Swagger : http://localhost:3000/api/ </b>`
  }
}
