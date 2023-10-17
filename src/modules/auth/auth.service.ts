import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../../entities';
import { UserLoginDto, UserRegisterDto, PasswordRecoveryDto } from './dto';
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
    try {
      const user: UserEntity = await this.usersService.findByEmail(
        loginData.email,
      );

      if (!user)
        throw new UnauthorizedException('User not found or not exists');

      const matchPass: boolean = await this.bcryptService.comparePasswords(
        loginData.password,
        user.password,
      );

      if (!matchPass)
        throw new UnauthorizedException('Invalid email or password');

      if (!user.isVerified)
        throw new BadRequestException('Please, confirm email address');

      delete user.password;

      return user;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async registerUser(registerData: UserRegisterDto) {
    try {
      const user: UserEntity = await this.usersService.findByEmail(
        registerData.email,
      );

      if (user)
        throw new BadRequestException('User with such email is already exists');

      const serviceToken: string = await this.jwtService.signAsync(
        { sub: registerData.email },
        {
          secret: this.cfgService.get<string>('JWT_TOKEN_SECRET'),
          expiresIn: '24h',
        },
      );

      console.log(registerData, serviceToken);
      return await this.usersService.createOne(registerData, serviceToken);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async confirmPassword() {
    try {
      console.log('e');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async passwordRecovery(passRecoveryDto: PasswordRecoveryDto) {
    try {
      console.log('e');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
