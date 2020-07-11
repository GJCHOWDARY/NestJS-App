import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { LinksService } from '../links/links.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private linksService: LinksService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (request) {
            if (!request.headers.authorization) {
                return true;
            }
            console.log(request.headers.authorization.split(' ')[1])
            await this.validateToken(request.headers.authorization.split(' ')[1]);
            return true;
        }
    }

    async validateToken(auth: any) {
        try {
            const host = auth.split(':')[0]
            let check: any = await this.linksService.findHost(host);
            if (check && check.length > 0) {
                // console.log(check,"-----ins")
            } else {
                const message = 'Auth error!';
                throw new HttpException(message, HttpStatus.UNAUTHORIZED);
            }
        } catch (err) {
            const message = 'Auth error!';
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }
}