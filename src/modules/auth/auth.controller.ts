import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Header,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserLoginDto, UserRegisterDto, PasswordRecoveryDto } from './dto';

import { LocalAuthenticationGuard } from '../../core/guards';
import { Response } from 'express';

@ApiTags('Auth Controller')
@ApiUnauthorizedResponse({
  status: 401,
  description: 'Forbidden. Unauthorized user',
})
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('sign-in')
  async localLogin(
    @Body() signInDto: UserLoginDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authService.validateUser(signInDto);

    res.header('Authorization', `Bearer ${user.accessToken}`);
    delete user.accessToken;

    return res.json({ user });
  }

  @Post('sign-up')
  async localRegister(@Body() signUpDto: UserRegisterDto) {
    return await this.authService.registerUser(signUpDto);
  }
}
