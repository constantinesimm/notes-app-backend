import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export class UserLoginDto {
  @IsEmail()
  @ApiProperty({
    type: 'string',
    description: 'Users email-address',
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Users password',
  })
  password: string;
}
