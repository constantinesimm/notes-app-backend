import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { BcryptService } from '../../core/services';

import { UsersModule } from '../users/users.module';
import { SharedModule } from '../../core/modules/shared.module';

import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    SharedModule,
    PassportModule,
    JwtModule.register({
      secret: '',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, BcryptService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
