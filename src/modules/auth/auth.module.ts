import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy, LocalStrategy } from '../../core/strategies';

import { AuthService } from './auth.service';
import { BcryptService } from '../../core/services';

import { UsersModule } from '../users/users.module';
import { SharedModule } from '../../core/modules/shared.module';

import { AuthController } from './auth.controller';

dotenv.config();

@Module({
  imports: [UsersModule, SharedModule, PassportModule],
  providers: [AuthService, BcryptService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
