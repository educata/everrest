import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { AuthExpectionKeys, ExceptionStatusKeys } from 'src/enums';
import { UserPayload } from 'src/interfaces';
import { User, UserDocument } from 'src/schemas';
import { ExceptionService } from '../services';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private exceptionService: ExceptionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.Unauthorized,
        'Token not found',
        AuthExpectionKeys.TokenNotFound,
      );
    }
    let decoded: UserPayload;
    try {
      decoded = await this.jwtService.verifyAsync(token, {
        secret: `${process.env.JWT_SECRET}`,
      });
    } catch (err) {
      const errorName = err.name || '';
      if (errorName === 'TokenExpiredError') {
        this.exceptionService.throwError(
          ExceptionStatusKeys.BadRequest,
          `Token expired, expired at: ${err.expiredAt}`,
          AuthExpectionKeys.TokenExpired,
        );
      } else {
        this.exceptionService.throwError(
          ExceptionStatusKeys.BadRequest,
          'Invalid token',
          AuthExpectionKeys.TokenInvalid,
        );
      }
    }
    const user = await this.userModel.findOne({ email: decoded.email });
    if (!user) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.NotFound,
        `Token contains incorrect user`,
        AuthExpectionKeys.TokenContainsIncorrectUser,
      );
    }
    if (!user.verified) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.Conflict,
        `User needs to verify email`,
        AuthExpectionKeys.UserEmailNotVerified,
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
