import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SharedModule } from '../../core/modules/shared.module';

@Module({
  imports: [SharedModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
