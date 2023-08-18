import { ExceptionService } from './../../../../shared/exception.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthExpectionKeys, ExceptionStatusKeys } from 'src/enums';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private exceptionService: ExceptionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        'Token not found',
        AuthExpectionKeys.TokenNotFound,
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: `${process.env.JWT_SECRET}`,
      });
      request['user'] = payload;
    } catch (err) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        'Invalid token',
        AuthExpectionKeys.TokenInvalid,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    const accessTokenCookie = request.cookies.access_token;
    let accessToken: string;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      accessToken = authHeader.substring(7);
    } else if (accessTokenCookie) {
      accessToken = accessTokenCookie;
    }
    return accessToken;
  }
}
