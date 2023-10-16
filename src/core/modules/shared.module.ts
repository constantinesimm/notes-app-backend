import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserEntity,
  NoteEntity,
  NoteTagEntity,
  NoteCategoryEntity,
} from '../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      NoteEntity,
      NoteTagEntity,
      NoteCategoryEntity,
    ]),
  ],
  exports: [
    TypeOrmModule.forFeature([
      UserEntity,
      NoteEntity,
      NoteTagEntity,
      NoteCategoryEntity,
    ]),
  ],
})
export class SharedModule {}
