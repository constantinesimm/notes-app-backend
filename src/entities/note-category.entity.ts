import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: 'NoteCategory' })
export class NoteCategoryEntity {
  @PrimaryGeneratedColumn({ type: 'number' })
  @ApiProperty({
    type: 'number',
    description: 'Notes table ID',
    required: true,
    example: 1,
  })
  id: number;

  @Column({ type: 'string', nullable: false })
  @ApiProperty({
    type: 'string',
    description: 'Notes category name',
    required: true,
    example: 'tag 1',
  })
  category: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  owner: number;
}
