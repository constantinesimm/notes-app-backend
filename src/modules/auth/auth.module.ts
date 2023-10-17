import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from '../../core/strategies';

import { AuthService } from './auth.service';
import { BcryptService } from '../../core/services';

import { UsersModule } from '../users/users.module';
import { SharedModule } from '../../core/modules/shared.module';

import { AuthController } from './auth.controller';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    SharedModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_TOKEN_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, BcryptService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
