/* eslint-disable max-lines-per-function */
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ErrorCode } from 'src/common/constants';
import { ErrorException } from 'src/utils/exceptions';

import { AuthService } from './auth.service';
import { User } from '../users/entities';
import { UsersService } from '../users/users.service';
import { SignInResponseDto } from './dtos/sign-in.response';

describe('AuthService test suite', (): void => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async (): Promise<void> => {
    usersService = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    jwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe('signIn', (): void => {
    it('should return a valid token when the user exists', async (): Promise<void> => {
      const username = 'faithong';
      const existingUser = {
        id: 1,
        username: 'faithong',
        userImageUrl: 'https://picsum.photos/seed/123/300/300',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        updatedBy: 'system',
        posts: [],
        comments: [],
      } as User;

      (usersService.findOne as jest.Mock).mockResolvedValue(existingUser);
      (jwtService.sign as jest.Mock).mockReturnValue('token123');

      const result: SignInResponseDto = await authService.signIn(username);

      expect(usersService.findOne).toHaveBeenCalledWith({ username });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: existingUser.username,
        sub: existingUser.id,
      });
      expect(result).toEqual({
        accessToken: 'token123',
        userId: existingUser.id,
        username: existingUser.username,
      });
    });

    it('should create a new user and return a valid token when the user does not exist', async (): Promise<void> => {
      const username = 'faithong';
      const newUserData = { username, createdBy: 'system', updatedBy: 'system' };

      (usersService.findOne as jest.Mock).mockResolvedValue(null);
      (usersService.create as jest.Mock).mockReturnValue(newUserData);

      const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.123);
      const savedUser = {
        id: 2,
        ...newUserData,
        userImageUrl: 'https://picsum.photos/seed/123/300/300',
        createdAt: new Date(),
        updatedAt: new Date(),
        posts: [],
        comments: [],
      } as User;

      (usersService.save as jest.Mock).mockResolvedValue(savedUser);
      (jwtService.sign as jest.Mock).mockReturnValue('newToken456');

      const result: SignInResponseDto = await authService.signIn(username);

      expect(usersService.findOne).toHaveBeenCalledWith({ username });
      expect(usersService.create).toHaveBeenCalledWith({
        username,
        createdBy: 'system',
        updatedBy: 'system',
      });
      expect(usersService.save).toHaveBeenCalledWith({
        ...newUserData,
        userImageUrl: 'https://picsum.photos/seed/123/300/300',
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: savedUser.username,
        sub: savedUser.id,
      });
      expect(result).toEqual({
        accessToken: 'newToken456',
        userId: savedUser.id,
        username: savedUser.username,
      });

      randomSpy.mockRestore();
    });

    it('should throw ErrorException when an unexpected error occurs in signIn', async (): Promise<void> => {
      const username = 'faithong';
      const error = new Error('Test error');

      (usersService.findOne as jest.Mock).mockRejectedValue(error);

      await expect(authService.signIn(username)).rejects.toThrow(
        new ErrorException(ErrorCode.SERVER_ERROR),
      );
      expect(usersService.findOne).toHaveBeenCalledWith({ username });
    });
  });
});
