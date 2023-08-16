import { Injectable } from '@nestjs/common';
import { ExceptionService } from 'src/shared';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { AuthExpectionKeys, ExceptionStatusKeys } from 'src/enums';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private exceptionService: ExceptionService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        'Invalid credentials',
        AuthExpectionKeys.IncorrectEmailOrPassword,
      );
    }
    return user;
  }
}
