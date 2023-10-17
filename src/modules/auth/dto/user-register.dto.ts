import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { UserLoginDto } from './user-login.dto';

export class UserRegisterDto extends UserLoginDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Users firstname',
  })
  firstName: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Users lastname',
  })
  lastName: string;
}
