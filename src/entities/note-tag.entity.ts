import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Index('tag_title-idx')
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

  @CreateDateColumn({
    name: 'created_at',
  })
  @ApiProperty({
    type: 'datetime',
    description: 'Notes category created at field',
    required: true,
    default: new Date(),
    example: `${new Date()}`,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @ApiProperty({
    type: 'datetime',
    description: 'Notes category updated at field',
    required: true,
    default: new Date(),
    example: `${new Date()}`,
  })
  updatedAt: Date;
}
