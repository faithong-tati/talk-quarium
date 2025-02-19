/* eslint-disable max-lines-per-function */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/constants';
import { UserDto } from 'src/common/dtos';
import { ErrorException } from 'src/utils/exceptions';
import { FindOptionsWhere } from 'typeorm';

import { User } from './entities';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  const repositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('should return user with image URL when user is found', async () => {
      const userCtx: UserDto = { userId: 1, username: 'faithong' };
      const foundUser = {
        id: 1,
        username: 'faithong',
        userImageUrl: 'https://picsum.photos/seed/123/300/300',
        posts: [],
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        updatedBy: 'system',
        deleted_at: null,
        deleted_by: null,
      } as User;

      repositoryMock.findOne.mockResolvedValue(foundUser);

      const result = await usersService.getUser(userCtx);

      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: userCtx.userId } });
      expect(result).toEqual({
        ...userCtx,
        userImageUrl: foundUser.userImageUrl,
      });
    });

    it('should throw USER_NOT_FOUND error when user is not found', async () => {
      const userCtx: UserDto = { userId: 1, username: 'faithong' };

      repositoryMock.findOne.mockResolvedValue(null);

      await expect(usersService.getUser(userCtx)).rejects.toThrow(ErrorException);
    });

    it('should rethrow ErrorException if findOne throws an ErrorException', async () => {
      const userCtx: UserDto = { userId: 1, username: 'faithong' };
      const error = new ErrorException(ErrorCode.USER_NOT_FOUND);

      repositoryMock.findOne.mockRejectedValue(error);

      await expect(usersService.getUser(userCtx)).rejects.toThrow(error);
    });

    it('should throw SERVER_ERROR when a generic error is thrown', async () => {
      const userCtx: UserDto = { userId: 1, username: 'faithong' };
      const genericError = new Error('Generic error');

      repositoryMock.findOne.mockRejectedValue(genericError);

      await expect(usersService.getUser(userCtx)).rejects.toThrow(ErrorException);
    });
  });

  describe('create', () => {
    it('should call repository.create and return the created user', () => {
      const data = { username: 'faithong', userImageUrl: 'https://picsum.photos/seed/123/300/300' };
      const createdUser = { id: 1, ...data } as User;

      repositoryMock.create.mockReturnValue(createdUser);

      const result = usersService.create(data);

      expect(repositoryMock.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(createdUser);
    });
  });

  describe('save', () => {
    it('should call repository.save and return the saved user', async () => {
      const user = {
        id: 1,
        username: 'faithong',
        userImageUrl: 'https://picsum.photos/seed/123/300/300',
      } as User;

      repositoryMock.save.mockResolvedValue(user);

      const result = await usersService.save(user);

      expect(repositoryMock.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('findOne', () => {
    it('should call repository.findOne and return the user', async () => {
      const where: FindOptionsWhere<User> = { id: 1 };
      const fakeUser = {
        id: 1,
        username: 'faithong',
        userImageUrl: 'https://picsum.photos/seed/123/300/300',
      } as User;

      repositoryMock.findOne.mockResolvedValue(fakeUser);

      const result = await usersService.findOne(where);

      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where });
      expect(result).toEqual(fakeUser);
    });
  });
});
