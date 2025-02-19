/* eslint-disable max-lines-per-function */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/constants';
import { UserDto } from 'src/common/dtos';
import { ErrorException } from 'src/utils/exceptions';
import { DataSource, FindOneOptions, Repository } from 'typeorm';

import { CommentsService } from './comments.service';
import { CommentsDecorator } from './decorators';
import { CreateCommentRequestDto } from './dtos/create-comment.request';
import { GetCommentsRequestDto } from './dtos/get-comments.request';
import { Comment } from './entities';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';

jest.mock(
  './decorators',
  (): Record<string, unknown> => ({
    CommentsDecorator: {
      createCommentResponse: jest.fn((comment: Comment): unknown => comment),
      getCommentsResponse: jest.fn((comments: Comment[], totalItems: number): unknown => ({
        items: comments,
        totalItems,
      })),
    },
  }),
);

describe('CommentsService test suite', (): void => {
  let commentsService: CommentsService;
  let repositoryMock: Partial<Repository<Comment>>;
  let dataSourceMock: { transaction: jest.Mock<any, any> };
  let postsServiceMock: Partial<PostsService>;
  let usersServiceMock: Partial<UsersService>;

  beforeEach(async (): Promise<void> => {
    repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    dataSourceMock = {
      transaction: jest.fn(),
    };

    postsServiceMock = {
      findOne: jest.fn(),
    };

    usersServiceMock = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: getRepositoryToken(Comment), useValue: repositoryMock },
        { provide: DataSource, useValue: dataSourceMock },
        { provide: PostsService, useValue: postsServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe('createComment', (): void => {
    const postId = 1;
    const userCtx: UserDto = { userId: 1, username: 'faithong' };
    const createCommentDto: CreateCommentRequestDto = { content: 'I have two orange cats!' };

    it('should create a comment successfully', async (): Promise<void> => {
      const fakeUser = { id: 1, username: 'faithong' };
      const fakePost = { id: postId, title: 'Does anyone have orange cats?' };
      const fakeCreatedComment = {
        content: createCommentDto.content,
        createdBy: userCtx.username,
        updatedBy: userCtx.username,
        userId: userCtx.userId,
        postId,
      };

      const fakeSavedComment = { id: 1, ...fakeCreatedComment };

      (usersServiceMock.findOne as jest.Mock).mockResolvedValue(fakeUser);
      (postsServiceMock.findOne as jest.Mock).mockResolvedValue(fakePost);
      dataSourceMock.transaction.mockImplementation(
        async (runInTransaction: (manager: any) => Promise<any>): Promise<any> => {
          const fakeManager = {
            create: jest.fn().mockReturnValue(fakeCreatedComment),
            save: jest.fn().mockResolvedValue(fakeSavedComment),
          };

          return await runInTransaction(fakeManager);
        },
      );
      (CommentsDecorator.createCommentResponse as jest.Mock).mockReturnValue(fakeSavedComment);

      const result = await commentsService.createComment(postId, createCommentDto, userCtx);

      expect(result).toEqual(fakeSavedComment);
    });

    it('should throw USER_NOT_FOUND if user is not found', async (): Promise<void> => {
      (usersServiceMock.findOne as jest.Mock).mockResolvedValue(null);
      await expect(
        commentsService.createComment(postId, createCommentDto, userCtx),
      ).rejects.toThrow(new ErrorException(ErrorCode.USER_NOT_FOUND));
    });

    it('should throw POST_NOT_FOUND if post is not found', async (): Promise<void> => {
      const fakeUser = { id: 1, username: 'faithong' };

      (usersServiceMock.findOne as jest.Mock).mockResolvedValue(fakeUser);
      (postsServiceMock.findOne as jest.Mock).mockResolvedValue(null);
      await expect(
        commentsService.createComment(postId, createCommentDto, userCtx),
      ).rejects.toThrow(new ErrorException(ErrorCode.POST_NOT_FOUND));
    });

    it('should throw SERVER_ERROR when an unexpected error occurs in createComment', async (): Promise<void> => {
      const fakeUser = { id: 1, username: 'faithong' };

      (usersServiceMock.findOne as jest.Mock).mockResolvedValue(fakeUser);
      (postsServiceMock.findOne as jest.Mock).mockImplementation(() => {
        throw new Error('generic error');
      });
      await expect(
        commentsService.createComment(postId, createCommentDto, userCtx),
      ).rejects.toThrow(new ErrorException(ErrorCode.SERVER_ERROR));
    });

    it('should rethrow ErrorException if encountered in createComment', async (): Promise<void> => {
      const error = new ErrorException(ErrorCode.USER_NOT_FOUND);

      (usersServiceMock.findOne as jest.Mock).mockRejectedValue(error);
      await expect(
        commentsService.createComment(postId, createCommentDto, userCtx),
      ).rejects.toThrow(error);
    });
  });

  describe('getComments', (): void => {
    const postId = 1;
    const getCommentsDto: GetCommentsRequestDto = { offset: 0, limit: 10 };

    it('should return comments successfully', async (): Promise<void> => {
      const fakePost = { id: postId, title: 'Does anyone have orange cats?' };

      (postsServiceMock.findOne as jest.Mock).mockResolvedValue(fakePost);

      const fakeComments: Comment[] = [
        {
          id: 1,
          content: 'I have two orange cats!',
          userId: 1,
          postId,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'faithong',
          updatedBy: 'faithong',
          user: {
            id: 1,
            username: 'faithong',
            userImageUrl: 'https://picsum.photos/seed/123/300/300',
            posts: [],
            comments: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 'faithong',
            updatedBy: 'faithong',
          },
          post: fakePost,
        } as unknown as Comment,
      ];

      const totalItems = 1;
      const qb = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(fakeComments),
        getCount: jest.fn().mockResolvedValue(totalItems),
      };

      (repositoryMock.createQueryBuilder as jest.Mock).mockReturnValue(qb);
      (CommentsDecorator.getCommentsResponse as jest.Mock).mockReturnValue({
        items: fakeComments,
        totalItems,
      });

      const result = await commentsService.getComments(postId, getCommentsDto);

      expect(result).toEqual({ items: fakeComments, totalItems });
      expect(qb.where).toHaveBeenCalledWith('comment.postId = :postId', { postId });
    });

    it('should throw POST_NOT_FOUND if post is not found in getComments', async (): Promise<void> => {
      (postsServiceMock.findOne as jest.Mock).mockResolvedValue(null);
      await expect(commentsService.getComments(postId, getCommentsDto)).rejects.toThrow(
        ErrorException,
      );
    });

    it('should throw SERVER_ERROR when an unexpected error occurs in getComments', async (): Promise<void> => {
      (postsServiceMock.findOne as jest.Mock).mockImplementation(() => {
        throw new Error('generic error');
      });
      await expect(commentsService.getComments(postId, getCommentsDto)).rejects.toThrow(
        ErrorException,
      );
    });
  });

  describe('create (helper)', (): void => {
    it('should call repository.create and return a comment', (): void => {
      const data = { content: 'I love cats!', userId: 1, postId: 1 };
      const createdComment = { id: 1, ...data } as Comment;

      (repositoryMock.create as jest.Mock).mockReturnValue(createdComment);

      const result = commentsService.create(data);

      expect(repositoryMock.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(createdComment);
    });
  });

  describe('save (helper)', (): void => {
    it('should call repository.save and return a comment', async (): Promise<void> => {
      const comment = { id: 1, content: 'I love cats!', userId: 1, postId: 1 } as Comment;

      (repositoryMock.save as jest.Mock).mockResolvedValue(comment);

      const result = await commentsService.save(comment);

      expect(repositoryMock.save).toHaveBeenCalledWith(comment);
      expect(result).toEqual(comment);
    });
  });

  describe('findOne (helper)', (): void => {
    it('should call repository.findOne and return a comment', async (): Promise<void> => {
      const options: FindOneOptions<Comment> = { where: { id: 1 } };
      const fakeComment = { id: 1, content: 'I love cats!', userId: 1, postId: 1 } as Comment;

      (repositoryMock.findOne as jest.Mock).mockResolvedValue(fakeComment);

      const result = await commentsService.findOne(options);

      expect(repositoryMock.findOne).toHaveBeenCalledWith(options);
      expect(result).toEqual(fakeComment);
    });
  });
});
