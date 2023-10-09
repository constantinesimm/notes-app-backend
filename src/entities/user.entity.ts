import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum UserRoles {
  Admin = 'admin',
  Customer = 'customer',
}
@Entity({ name: 'Users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'number' })
  @ApiProperty({
    type: 'number',
    description: 'Users table ID',
    required: true,
    example: 1,
  })
  id: number;

  @Column({ unique: true, type: 'string' })
  @ApiProperty({
    type: 'string',
    description: 'Users email for login and send notifications',
    required: true,
    example: 'example@example.com',
  })
  email: string;

  @Column({ type: 'string' })
  @ApiProperty({
    type: 'string',
    description: 'Users password hash',
    required: true,
    example: 'sdnvsdbvbsduvhsduiig2sdvdsvsdvs',
  })
  password: string;

  @Column({ type: 'string' })
  @ApiProperty({
    type: 'string',
    description: 'Users name',
    required: true,
    example: 'John Doe',
  })
  name: string;

  @Column({ type: 'boolean', name: 'is_verified', default: false })
  @ApiProperty({
    type: 'boolean',
    description: 'Indicates whether the user has confirmed their email address',
    required: true,
    default: false,
    example: 'false',
  })
  isVerified: boolean;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.Customer })
  @ApiProperty({
    type: 'enum',
    description: 'Users account role',
    required: true,
    default: UserRoles.Customer,
    example: `${UserRoles.Admin} or ${UserRoles.Customer}`,
  })
  role: UserRoles;

  @Column({
    type: 'datetime',
    name: 'created_at',
    default: new Date(),
  })
  @ApiProperty({
    type: 'datetime',
    description: 'Users account created at field',
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
    description: 'Users account updated at field',
    required: true,
    default: new Date(),
    example: `${new Date()}`,
  })
  updatedAt: Date;
}
