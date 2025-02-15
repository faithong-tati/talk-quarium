import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorCode } from 'src/common/constants';
import { ErrorException } from 'src/utils/exceptions';

import { User } from '../users/entities';
import { UsersService } from '../users/users.service';
import { SignInResponseDto } from './dtos/sign-in.response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signIn(username: string): Promise<SignInResponseDto> {
    try {
      const user = await this.validateAuth(username);
      const payload = { username: user.username, sub: user.id };

      return {
        accessToken: this.jwtService.sign(payload),
        userId: user.id,
        username: user.username,
      };
    } catch (error) {
      console.error('[AuthService][signIn] Unexpected error: ', error);

      throw new ErrorException(ErrorCode.UNAUTHORIZED);
    }
  }

  private async validateAuth(username: string): Promise<User> {
    try {
      const user = await this.usersService.findOne({ username });

      if (!user) {
        const author = 'system';

        return await this.usersService.create({
          username,
          createdBy: author,
          updatedBy: author,
        });
      }

      return user;
    } catch (error) {
      console.error('[AuthService][validateAuth] Unexpected error: ', error);

      throw new ErrorException(ErrorCode.UNAUTHORIZED);
    }
  }
}
