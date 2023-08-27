import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, VerifyEmailDto } from '../dtos';
import { LocalAuthGuard, RefreshJwtGuard } from './guards';
import { Response } from 'express';
import { JwtGuard } from 'src/shared';

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
}
