import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

enum UserRoles {
  Admin = 'admin',
  Customer = 'customer',
}
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: 'number',
    description: 'Users table ID',
    required: true,
    example: 1,
  })
  id: number;

  @Index('email-idx', { unique: true })
  @Column({ unique: true })
  @ApiProperty({
    type: 'string',
    description: 'Users email for login and send notifications',
    required: true,
    example: 'example@example.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    type: 'string',
    description: 'Users password hash',
    required: true,
    example: 'sdnvsdbvbsduvhsduiig2sdvdsvsdvs',
  })
  password: string;

  @Column({ name: 'first_name' })
  @ApiProperty({
    type: 'string',
    description: 'Users first name',
    required: true,
    example: 'John',
  })
  firstName: string;

  @Column({ name: 'last_name' })
  @ApiProperty({
    type: 'string',
    description: 'Users last name',
    required: true,
    example: 'Doe',
  })
  lastName: string;

  @Column({ name: 'is_verified', default: false })
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

  @Index('access_token-idx')
  @Column({ name: 'access_token', default: null, nullable: true })
  @ApiProperty({
    type: ['string', 'null'],
    description: 'Users access token',
    required: false,
    default: null,
    example: `dsavsdvsdonvsdvdsvosdv or null`,
  })
  accessToken: string | null;

  @Index('service_token-idx')
  @Column({ name: 'service_token', default: null, nullable: true })
  @ApiProperty({
    type: ['string', 'null'],
    description: 'Users service token',
    required: false,
    default: null,
    example: `dsavsdvsdonvsdvdsvosdv or null`,
  })
  serviceToken: string | null;

  @Column({ default: 'avatar.jpg' })
  @ApiProperty({
    type: 'string',
    description: 'Users account avatar',
    required: false,
    default: new Date(),
    example: `${new Date()}`,
  })
  avatar?: string;

  @Column({
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
