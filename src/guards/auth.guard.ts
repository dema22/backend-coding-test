import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayload } from 'src/interface/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.getArgByIndex(2).req as Request;
        console.log("Entro a auth guard");
        //console.log(req);
        console.log(process.env.JWT_SECRET_KEY);
        const token = this.extractTokenFromHeader(req);
        if (!token) {
            throw new UnauthorizedException("You didnt provided a token.");
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET_KEY
                }
            );

            req['user'] = payload;
        } catch {
            console.log("Error when verifing jwt");
            console.log(process.env.JWT_SECRET_KEY);
            throw new UnauthorizedException("Error when trying to authenticate the provided user.");
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}