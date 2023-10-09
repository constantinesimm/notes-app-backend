import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

enum NoteType {
  List = 'list',
  Text = 'text',
}

enum NoteAccessType {
  Public = 'public',
  Private = 'private',
}
@Entity({ name: 'Notes' })
export class NoteEntity {
  @PrimaryGeneratedColumn({ type: 'number' })
  @ApiProperty({
    type: 'number',
    description: 'Notes table ID',
    required: true,
    example: 1,
  })
  id: number;

  @Column({ type: 'string' })
  @ApiProperty({
    type: 'string',
    description: 'Notes title',
    required: true,
    example: 'Some new note',
  })
  title: string;

  @Column({ type: 'string' })
  @ApiProperty({
    type: 'string',
    description: 'Notes body text or text array',
    required: true,
    example: '"some note text" or ["some text1", "some text2"]',
  })
  body: string | string[];

  @Column({ type: 'string', nullable: true })
  @ApiProperty({
    type: 'string',
    description: 'Notes link for share',
    required: false,
    example: 'https://example.com/link',
  })
  link: string;

  @Column({ type: 'enum', enum: NoteType })
  @ApiProperty({
    type: 'enum',
    description: 'Notes type',
    required: true,
    example: `${NoteType.List} or ${NoteType.Text}`,
  })
  type: NoteType;

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

  @Column({
    type: 'datetime',
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
    type: 'datetime',
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
