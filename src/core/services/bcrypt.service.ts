import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  private readonly saltRounds: 10 = 10 as const;
  constructor() {}

  private async genSalt(): Promise<string> {
    return await bcrypt.genSalt(this.saltRounds);
  }
  public async hashPassword(password: string): Promise<string> {
    const salt: string = await this.genSalt();

    return await bcrypt.hash(password, salt);
  }

  public async comparePasswords(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
