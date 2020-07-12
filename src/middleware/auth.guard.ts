import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LinksService } from '../links/links.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private linksService: LinksService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (request) {
            if (!request.headers.authorization) {
                //TODO: for now I am allowing 
                return true;
            }
            let check:any=await this.validateToken(request.headers.authorization.split(' ')[1]);
            return check;
        }
    }

    async validateToken(auth: any) {
        try {
            const host= auth.split(':')[0]
            const secret= auth.split(':')[1]
            let check: any = await this.linksService.findHost(host);
            if (check && check.length > 0) { 
                 return true; 
            } else {
                const message = 'Auth error!';
                throw new HttpException(message, HttpStatus.UNAUTHORIZED);
            }
        } catch (err) {
            console.log(err)
            const message = 'Auth error!';
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }
}