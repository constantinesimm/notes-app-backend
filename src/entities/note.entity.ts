import { ApiProperty } from '@nestjs/swagger';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { NoteTagEntity } from './note-tag.entity';

enum NoteAccessType {
  Public = 'public',
  Private = 'private',
}
@Entity({ name: 'Notes' })
export class NoteEntity {
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
    description: 'Notes title',
    required: true,
    example: 'Some new note',
  })
  title: string;

  @Column()
  @ApiProperty({
    type: 'string',
    description: 'Notes body text or text array',
    required: true,
    example: 'some note text',
  })
  body: string;

  @Column({ nullable: true })
  @ApiProperty({
    type: 'string',
    description: 'Notes link for share',
    required: false,
    example: 'https://example.com/link',
  })
  link: string;

  @Column({
    type: 'enum',
    enum: NoteAccessType,
    name: 'access_type',
    default: NoteAccessType.Private,
  })
  @ApiProperty({
    type: 'enum',
    description: 'Notes access type',
    required: true,
    default: NoteAccessType.Private,
    example: `${NoteAccessType.Private} or ${NoteAccessType.Public}`,
  })
  accessType: NoteAccessType;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
  @ApiProperty({
    type: 'number',
    description: 'Notes users access',
    required: false,
  })
  accessUsers: number;

  @ManyToMany(() => NoteTagEntity, (tag) => tag.id, { nullable: true })
  tags: NoteTagEntity[];

  @Column({
    name: 'created_at',
    default: new Date(),
  })
  @ApiProperty({
    type: 'datetime',
    description: 'Note created at field',
    required: true,
    default: new Date(),
    example: `${new Date()}`,
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    default: new Date(),
  })
  @ApiProperty({
    type: 'datetime',
    description: 'Note updated at field',
    required: true,
    default: new Date(),
    example: `${new Date()}`,
  })
  updatedAt: Date;
}
