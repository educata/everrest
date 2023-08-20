import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ExceptionService } from './exception.service';
import { ExceptionStatusKeys, AuthExpectionKeys } from 'src/enums';

export const Auth = createParamDecorator(
  async (
    data: { exceptionService: ExceptionService; jwtService: JwtService },
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    const accessTokenCookie = request.cookies.access_token;
    const { exceptionService, jwtService } = data;

    let accessToken: string;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      accessToken = authHeader.substring(7);
    } else if (accessTokenCookie) {
      accessToken = accessTokenCookie;
    }

    if (!accessToken) {
      exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        'Token not found',
        AuthExpectionKeys.TokenNotFound,
      );
    }

    try {
      const user = await jwtService.verifyAsync(accessToken, {
        secret: `${process.env.JWT_SECRET}`,
      });
      return user;
    } catch {
      exceptionService[0].throwError(
        ExceptionStatusKeys.BadRequest,
        'Invalid token',
        AuthExpectionKeys.TokenInvalid,
      );
    }
  },
);
