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
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  private translate(key: string, args?: any): string {
    const options = {
      lang: I18nContext.current().lang,
    };
    if (args) Object.assign(options, { ...args });

    return this.i18n.t(key, options);
  }

  constructor(
    private cfgService: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService,
    private bcryptService: BcryptService,
    readonly i18n: I18nService,
  ) {}

  async validateUser(loginData: UserLoginDto): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.usersService.findByEmail(
        loginData.email.toLowerCase().trim(),
      );

      if (!user)
        throw new UnauthorizedException(
          this.translate('auth.errors.userNotFound'),
        );

      const matchPass: boolean = await this.bcryptService.comparePasswords(
        loginData.password,
        user.password,
      );

      if (!matchPass)
        throw new UnauthorizedException(
          this.translate('auth.errors.passwordNotMatched'),
        );

      if (!user.isVerified)
        throw new BadRequestException(
          this.translate('auth.errors.emailConfirm'),
        );

      delete user.password;

      const accessToken: string = await this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
        },
        {
          secret: this.cfgService.get<string>('JWT_TOKEN_SECRET'),
          expiresIn: '24h',
        },
      );
      await this.usersService.updateOne({ id: user.id, accessToken });

      return {
        ...user,
        accessToken,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async registerUser(registerData: UserRegisterDto) {
    try {
      const user: UserEntity = await this.usersService.findByEmail(
        registerData.email.toLowerCase().trim(),
      );

      if (user)
        throw new BadRequestException(this.translate('auth.errors.userExists'));

      const serviceToken: string = await this.jwtService.signAsync(
        { sub: registerData.email },
        {
          secret: this.cfgService.get<string>('JWT_TOKEN_SECRET'),
          expiresIn: '24h',
        },
      );

      registerData.email = registerData.email.toLowerCase().trim();
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
