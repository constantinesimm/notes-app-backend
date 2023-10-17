import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SharedModule } from '../../core/modules/shared.module';
import { BcryptService } from '../../core/services';

@Module({
  imports: [SharedModule],
  providers: [UsersService, BcryptService],
  exports: [UsersService],
})
export class UsersModule {}
