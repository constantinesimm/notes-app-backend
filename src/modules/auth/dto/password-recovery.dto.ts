import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordRecoveryDto {
  @IsEmail()
  @ApiProperty({
    type: 'string',
    description: 'Users email',
  })
  email: string;
}
