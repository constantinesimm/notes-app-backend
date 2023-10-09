import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: 'tags' })
export class NoteTagEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: 'number',
    description: 'Notes table ID',
    required: true,
    example: 1,
  })
  id: number;

  @Index()
  @Column()
  @ApiProperty({
    type: 'string',
    description: 'Notes tag name',
    required: true,
    example: 'tag 1',
  })
  tag: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
  owner: number;
}
