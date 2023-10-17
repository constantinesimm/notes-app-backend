import { IUserData } from '../../users/interfaces';

export class UserLoginResponseDto {
  user: IUserData;
  message: string;
}
