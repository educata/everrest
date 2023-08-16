import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../dtos';
import { JwtGuard, LocalAuthGuard, RefreshJwtGuard } from './guards';
import { Response } from 'express';

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
    return 'safe route reached';
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  refreshToken(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.refreshToken(req.user, response);
  }
}
