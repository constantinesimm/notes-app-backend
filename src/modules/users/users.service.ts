import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../../entities';
import { UserRegisterDto } from '../auth/dto';
import { BcryptService } from '../../core/services';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly bcryptService: BcryptService,
  ) {}

  public async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }

  public async createOne(
    userDto: UserRegisterDto,
    serviceToken: string,
  ): Promise<UserEntity> {
    const user = await this.userRepository.save({
      ...userDto,
      password: await this.bcryptService.hashPassword(userDto.password),
      serviceToken,
    });
    delete user.password;

    return user;
  }

  public async updateOne(userDto: Partial<UserEntity>) {
    return await this.userRepository.update(userDto.id, { ...userDto });
  }
}
