import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../../entities';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from '../users/users.service';

import { BcryptService } from '../../core/services';

@Injectable()
export class AuthService {
  constructor(
    private cfgService: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService,
    private bcryptService: BcryptService,
  ) {}

  async validateUser(loginData: UserLoginDto): Promise<UserEntity> {
    const user: UserEntity = await this.usersService.findByEmail(
      loginData.email,
    );

    const matchPass: Promise<boolean> = this.bcryptService.comparePasswords(
      loginData.password,
      user.password,
    );

    if (user && matchPass) {
      delete user.password;

      return user;
    } else return;
  }
}
