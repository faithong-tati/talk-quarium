import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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
