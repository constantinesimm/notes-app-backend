import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserLoginDto } from './dto/user-login.dto';

import { UserEntity } from '../../entities';

@ApiTags('Auth Controller')
@ApiUnauthorizedResponse({
  status: 401,
  description: 'Forbidden. Unauthorized user',
})
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  async localLogin(@Body() signInDto: UserLoginDto): Promise<UserEntity> {
    return await this.authService.validateUser(signInDto);
  }

  @Post('sign-up')
  async localRegister(@Body() signUpDto) {}
}
