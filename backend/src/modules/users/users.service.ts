import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/constants';
import { UserDto } from 'src/common/dtos';
import { ErrorException } from 'src/utils/exceptions';
import { FindOptionsWhere, Repository } from 'typeorm';

import { GetUserResponseDto } from './dtos';
import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUser(userCtx: UserDto): Promise<GetUserResponseDto> {
    try {
      const { userId } = userCtx;
      const user = await this.findOne({ id: userId });

      if (!user) {
        throw new ErrorException(ErrorCode.USER_NOT_FOUND);
      }

      return { ...userCtx, userImageUrl: user.userImageUrl };
    } catch (error) {
      if (error instanceof ErrorException) {
        console.error('[UsersService][getUser] Expected error:', error);

        throw error;
      }

      console.error('[UsersService][getUser] Unexpected error: ', error);

      throw new ErrorException(ErrorCode.SERVER_ERROR, `get user failed`);
    }
  }

  create(data: Partial<User>): User {
    return this.usersRepository.create(data);
  }

  async save(data: User): Promise<User> {
    return this.usersRepository.save(data);
  }

  async findOne(where: FindOptionsWhere<User>): Promise<User | null> {
    return this.usersRepository.findOne({ where });
  }
}
