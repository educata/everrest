import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Res,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignUpDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
  VerifyEmailDto,
} from '../dtos';
import { LocalAuthGuard, RefreshJwtGuard } from './guards';
import { Response } from 'express';
import { CurrentUser, CurrentUserInterceptor, JwtGuard } from 'src/shared';
import { UserPayload } from 'src/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign_up')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign_in')
  signIn(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.signIn(req.user, response);
  }

  @UseGuards(JwtGuard)
  @Get('test')
  someSafeRoute() {
    return this.authService.test();
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  refreshToken(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.refreshToken(req.user, response);
  }

  @Post('verify_email')
  verifyEmail(@Body() body: VerifyEmailDto) {
    return this.authService.verifyEmail(body.email, false);
  }

  @Get('verify/:token')
  verifyDocument(@Param('token') token: string) {
    return this.authService.generateDocument(token);
  }

  @Get('submit/:token')
  submitEmail(@Param('token') token: string) {
    return this.authService.submitEmailToken(token);
  }

  @Post('recovery')
  recoveryPassword(@Body() body: VerifyEmailDto) {
    return this.authService.recoveryPassword(body.email);
  }

  @Get('recovery/:token')
  recoveryPasswordPage(@Param('token') token: string) {
    return this.authService.generatePasswordReset(token);
  }

  @Patch('update')
  @UseGuards(JwtGuard)
  @UseInterceptors(CurrentUserInterceptor)
  updateUser(@CurrentUser() user: UserPayload, @Body() body: UpdateUserDto) {
    return this.authService.updateUser(user, body);
  }

  @Patch('change_password')
  @UseGuards(JwtGuard)
  @UseInterceptors(CurrentUserInterceptor)
  updateUserPassword(
    @CurrentUser() user: UserPayload,
    @Body() body: UpdateUserPasswordDto,
  ) {
    return this.authService.updateUserPassword(user, body);
  }
}
