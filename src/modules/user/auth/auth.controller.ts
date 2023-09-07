import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Res,
  Param,
  Patch,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInDto,
  SignUpDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
  VerifyEmailDto,
} from '../dtos';
import { LocalAuthGuard, RefreshJwtGuard } from './guards';
import { Response } from 'express';
import { CurrentUser, CurrentUserInterceptor, JwtGuard } from 'src/shared';
import { UserPayload } from 'src/interfaces';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(JwtGuard)
  @UseInterceptors(CurrentUserInterceptor)
  getCurrentUser(@CurrentUser() user: UserPayload) {
    return user;
  }

  @Get('id/:id')
  @UseGuards(JwtGuard)
  @UseInterceptors(CurrentUserInterceptor)
  getUserByID(@CurrentUser() user: UserPayload, @Param('id') id: string) {
    return this.authService.getUserByID(user, id);
  }

  @Post('sign_up')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('sign_in')
  @UseGuards(LocalAuthGuard)
  signIn(
    @CurrentUser() user: UserPayload,
    @Res({ passthrough: true }) response: Response,
    @Body() dto: SignInDto,
  ) {
    dto;
    return this.authService.signIn(user, response);
  }

  @Get('test')
  @UseGuards(JwtGuard)
  someSafeRoute() {
    return this.authService.test();
  }

  @Post('refresh')
  @UseGuards(RefreshJwtGuard)
  refreshToken(@Res({ passthrough: true }) response: Response) {
    return this.authService.refreshToken(response);
  }

  @Post('verify_email')
  verifyEmail(@Body() body: VerifyEmailDto) {
    return this.authService.verifyEmail(body.email, false);
  }

  @Get('verify/:token')
  @ApiExcludeEndpoint(true)
  verifyDocument(@Param('token') token: string) {
    return this.authService.generateDocument(token);
  }

  @Get('submit/:token')
  @ApiExcludeEndpoint(true)
  submitEmail(@Param('token') token: string) {
    return this.authService.submitEmailToken(token);
  }

  @Post('recovery')
  recoveryPassword(@Body() body: VerifyEmailDto) {
    return this.authService.recoveryPassword(body.email);
  }

  @Get('recovery/:token')
  @ApiExcludeEndpoint(true)
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

  @Delete('delete')
  @UseGuards(JwtGuard)
  @UseInterceptors(CurrentUserInterceptor)
  deleteCurrentUser(@CurrentUser() user: UserPayload) {
    return this.authService.deleteCurrentUser(user);
  }
}
