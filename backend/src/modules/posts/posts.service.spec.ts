/* eslint-disable max-lines-per-function */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorCode, Topic } from 'src/common/constants';
import { UserDto } from 'src/common/dtos';
import { ErrorException } from 'src/utils/exceptions';
import { DataSource, FindOneOptions, Repository } from 'typeorm';

import { PostsDecorator } from './decorators';
import { CreatePostRequestDto } from './dtos/create-post.request';
import { GetPostsPassportRequestDto } from './dtos/get-posts.request';
import { UpdatePostRequestDto } from './dtos/update-post.request';
import { Post } from './entities';
import { PostsService } from './posts.service';

jest.mock(
  './decorators',
  (): Record<string, unknown> => ({
    PostsDecorator: {
      createPostResponse: jest.fn((post: Post): unknown => post),
      getPostsResponse: jest.fn((posts: Post[], total: number): unknown => ({
        items: posts as unknown,
        totalItems: total,
      })),
      getPostByIdResponse: jest.fn((post: Post): unknown => post),
      updatePostResponse: jest.fn((post: Post): unknown => post),
    },
  }),
);

type FakeManager = {
  create: jest.Mock<unknown, [Partial<Post>]>;
  save: jest.Mock<Promise<Post>, [Post]>;
  update: jest.Mock<unknown, [typeof Post, number, Partial<Post>]>;
  softDelete: jest.Mock<unknown, [typeof Post, number]>;
};

describe('PostsService test suite', (): void => {
  let postsService: PostsService;
  let repositoryMock: Partial<Repository<Post>>;
  let dataSourceMock: {
    transaction: jest.Mock<
      Promise<unknown>,
      [(runInTransaction: (manager: FakeManager) => Promise<unknown>) => Promise<unknown>]
    >;
  };

  beforeEach(async (): Promise<void> => {
    repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    dataSourceMock = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: getRepositoryToken(Post), useValue: repositoryMock as Repository<Post> },
        { provide: DataSource, useValue: dataSourceMock as unknown as DataSource },
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe('createPost', (): void => {
    it('should create a post successfully', async (): Promise<void> => {
      const userCtx: UserDto = { userId: 1, username: 'faithong' };
      const createPostDto: CreatePostRequestDto = {
        topic: Topic.FOOD,
        title: 'Have you try this pizza?',
        content: 'Pepperoni pizza is legit!',
      };

      const fakeCreatedPost: Partial<Post> = {
        topic: createPostDto.topic,
        title: createPostDto.title,
        content: createPostDto.content,
        createdBy: userCtx.username,
        updatedBy: userCtx.username,
        userId: userCtx.userId,
      };

      const fakeSavedPost = { id: 1, ...fakeCreatedPost } as unknown as Post;

      dataSourceMock.transaction.mockImplementation(
        (runInTransaction: (manager) => Promise<unknown>): Promise<unknown> => {
          const fakeManager = {
            create: jest.fn().mockReturnValue(fakeCreatedPost),
            save: jest.fn().mockResolvedValue(fakeSavedPost),
            update: jest.fn().mockResolvedValue({}),
            softDelete: jest.fn().mockResolvedValue({}),
          };

          return runInTransaction(fakeManager);
        },
      );

      (PostsDecorator.createPostResponse as jest.Mock).mockReturnValue(fakeSavedPost);

      const result: unknown = await postsService.createPost(userCtx, createPostDto);

      expect(result).toEqual(fakeSavedPost);
      expect(dataSourceMock.transaction).toHaveBeenCalled();
    });

    it('should throw USER_NOT_FOUND error if userId is missing', async (): Promise<void> => {
      const userCtx = { userId: null, username: 'faithong' } as unknown as UserDto;
      const createPostDto: CreatePostRequestDto = {
        topic: Topic.FOOD,
        title: 'Have you try this pizza?',
        content: 'Pepperoni pizza is legit!',
      };

      await expect(postsService.createPost(userCtx, createPostDto)).rejects.toThrow(
        new ErrorException(ErrorCode.USER_NOT_FOUND),
      );
    });

    it('should throw SERVER_ERROR when an unexpected error occurs in createPost', async (): Promise<void> => {
      const userCtx: UserDto = { userId: 1, username: 'faithong' };
      const createPostDto: CreatePostRequestDto = {
        topic: Topic.FOOD,
        title: 'Have you try this pizza?',
        content: 'Pepperoni pizza is legit!',
      };

      dataSourceMock.transaction.mockImplementation(() => {
        throw new Error('generic error');
      });

      await expect(postsService.createPost(userCtx, createPostDto)).rejects.toThrowError(
        new ErrorException(ErrorCode.SERVER_ERROR, 'create post failed'),
      );
    });
  });

  describe('getPosts', (): void => {
    it('should return posts with response from decorator', async (): Promise<void> => {
      const args: GetPostsPassportRequestDto = { offset: 0, limit: 10 };
      const userCtx: UserDto = { userId: 1, username: 'faithong' };
      const fakePostsArray: Post[] = [
        {
          id: 1,
          topic: Topic.FOOD,
          title: 'Have you try this pizza?',
          content: 'Pepperoni pizza is legit!',
          userId: 1,
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
          comments: [],
        } as unknown as Post,
      ];

      const totalCount = 1;
      const qb: {
        leftJoinAndSelect: () => typeof qb;
        select: () => typeof qb;
        orderBy: () => typeof qb;
        skip: () => typeof qb;
        take: () => typeof qb;
        andWhere: () => typeof qb;
        getMany: () => Promise<Post[]>;
        getCount: () => Promise<number>;
      } = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(fakePostsArray),
        getCount: jest.fn().mockResolvedValue(totalCount),
      };

      (repositoryMock.createQueryBuilder as jest.Mock).mockReturnValue(qb);

      const expectedResponse = { items: fakePostsArray, totalItems: totalCount };

      (PostsDecorator.getPostsResponse as jest.Mock).mockReturnValue(expectedResponse);

      const result: unknown = await postsService.getPosts(args, userCtx);

      expect(result).toEqual(expectedResponse);
      expect(repositoryMock.createQueryBuilder).toHaveBeenCalledWith('post');
    });

    it('should throw SERVER_ERROR when an unexpected error occurs in getPosts', async (): Promise<void> => {
      const args: GetPostsPassportRequestDto = { offset: 0, limit: 10 };
      const userCtx: UserDto = { userId: 1, username: 'faithong' };

      (repositoryMock.createQueryBuilder as jest.Mock).mockImplementation(() => {
        throw new Error('generic error');
      });

      await expect(postsService.getPosts(args, userCtx)).rejects.toThrowError(
        new ErrorException(ErrorCode.SERVER_ERROR, 'get posts failed'),
      );
    });

    it('should add filters for topic, title, username, and user id', async (): Promise<void> => {
      const args: GetPostsPassportRequestDto = {
        offset: 0,
        limit: 10,
        topic: Topic.FOOD,
        title: 'pizza',
        username: 'faithong',
      };

      const userCtx: UserDto = { userId: 1, username: 'faithong' };
      const qb = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
        getCount: jest.fn().mockResolvedValue(0),
      };

      (repositoryMock.createQueryBuilder as jest.Mock).mockReturnValue(qb);

      await postsService.getPosts(args, userCtx);

      expect(qb.andWhere).toHaveBeenCalledWith('post.topic = :topic', { topic: Topic.FOOD });
      expect(qb.andWhere).toHaveBeenCalledWith('post.title LIKE :title', { title: `%pizza%` });
      expect(qb.andWhere).toHaveBeenCalledWith('user.username LIKE :username', {
        username: `%faithong%`,
      });
      expect(qb.andWhere).toHaveBeenCalledWith('user.id = :userId', { userId: 1 });
    });
  });

  describe('getPostById', (): void => {
    it('should return post response if found', async (): Promise<void> => {
      const fakePost = {
        id: 1,
        topic: Topic.FOOD,
        title: 'Have you try this pizza?',
        content: 'Pepperoni pizza is legit!',
        userId: 1,
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
        comments: [],
      } as unknown as Post;

      (repositoryMock.findOne as jest.Mock).mockResolvedValue(fakePost);
      (PostsDecorator.getPostByIdResponse as jest.Mock).mockReturnValue(fakePost);

      const result: unknown = await postsService.getPostById(1);

      expect(result).toEqual(fakePost);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['user', 'comments'],
      });
    });

    it('should throw POST_NOT_FOUND if post not found', async (): Promise<void> => {
      (repositoryMock.findOne as jest.Mock).mockResolvedValue(null);
      await expect(postsService.getPostById(1)).rejects.toThrow(
        new ErrorException(ErrorCode.POST_NOT_FOUND),
      );
    });

    it('should throw SERVER_ERROR when an unexpected error occurs in getPostById', async (): Promise<void> => {
      (repositoryMock.findOne as jest.Mock).mockImplementation(() => {
        throw new Error('generic error');
      });
      await expect(postsService.getPostById(1)).rejects.toThrowError(
        new ErrorException(ErrorCode.SERVER_ERROR, 'get post id: 1 failed'),
      );
    });
  });

  describe('updatePostById', (): void => {
    it('should update post if user is owner', async (): Promise<void> => {
      const ctxUser: UserDto = { userId: 1, username: 'faithong' };
      const updatePostDto: UpdatePostRequestDto = {
        topic: Topic.PETS,
        title: 'Does anyone have orange cats?',
        content: 'I love cats!',
      };

      const fakePost = {
        id: 1,
        topic: Topic.FOOD,
        title: 'Have you try this pizza?',
        content: 'Pepperoni pizza is legit!',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'faithong',
        updatedBy: 'faithong',
      } as unknown as Post;

      (repositoryMock.findOne as jest.Mock).mockResolvedValue(fakePost);

      const updatedPost = {
        ...fakePost,
        ...updatePostDto,
        updatedBy: ctxUser.username,
      } as unknown as Post;

      (repositoryMock.save as jest.Mock).mockResolvedValue(updatedPost);
      (PostsDecorator.updatePostResponse as jest.Mock).mockReturnValue(updatedPost);

      const result: unknown = await postsService.updatePostById(1, updatePostDto, ctxUser);

      expect(result).toEqual(updatedPost);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repositoryMock.save).toHaveBeenCalledWith({
        ...fakePost,
        ...updatePostDto,
        updatedBy: ctxUser.username,
      });
    });

    it('should throw POST_NOT_FOUND if post does not exist', async (): Promise<void> => {
      const ctxUser: UserDto = { userId: 1, username: 'faithong' };

      (repositoryMock.findOne as jest.Mock).mockResolvedValue(null);
      await expect(
        postsService.updatePostById(
          1,
          {
            topic: Topic.FOOD,
            title: 'Have you try this pizza?',
            content: 'Pepperoni pizza is legit!',
          },
          ctxUser,
        ),
      ).rejects.toThrow(new ErrorException(ErrorCode.POST_NOT_FOUND));
    });

    it('should throw FORBIDDEN if user is not owner', async (): Promise<void> => {
      const ctxUser: UserDto = { userId: 1, username: 'faithong' };
      const fakePost = {
        id: 1,
        topic: Topic.FOOD,
        title: 'Have you try this pizza?',
        content: 'Pepperoni pizza is legit!',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'faithong',
        updatedBy: 'faithong',
      } as unknown as Post;

      (repositoryMock.findOne as jest.Mock).mockResolvedValue(fakePost);
      await expect(
        postsService.updatePostById(
          1,
          { topic: Topic.FOOD, title: 'Does anyone have orange cats?', content: 'I love cats!' },
          ctxUser,
        ),
      ).rejects.toThrow(new ErrorException(ErrorCode.FORBIDDEN));
    });

    it('should throw SERVER_ERROR when an unexpected error occurs in updatePostById', async (): Promise<void> => {
      const ctxUser: UserDto = { userId: 1, username: 'faithong' };
      const updatePostDto: UpdatePostRequestDto = {
        topic: Topic.FOOD,
        title: 'Have you try this pizza?',
        content: 'Pepperoni pizza is legit!',
      };

      (repositoryMock.findOne as jest.Mock).mockImplementation(() => {
        throw new Error('generic error');
      });
      await expect(postsService.updatePostById(1, updatePostDto, ctxUser)).rejects.toThrowError(
        new ErrorException(ErrorCode.SERVER_ERROR, 'update post id: 1 failed'),
      );
    });
  });

  describe('deletePostById', (): void => {
    it('should delete post if user is owner', async (): Promise<void> => {
      const ctxUser: UserDto = { userId: 1, username: 'faithong' };
      const fakePost = {
        id: 1,
        topic: Topic.FOOD,
        title: 'Have you try this pizza?',
        content: 'Pepperoni pizza is legit!',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'faithong',
        updatedBy: 'faithong',
      } as unknown as Post;

      (repositoryMock.findOne as jest.Mock).mockResolvedValue(fakePost);

      dataSourceMock.transaction.mockImplementation(
        (runInTransaction: (manager) => Promise<unknown>): Promise<unknown> => {
          const fakeManager = {
            create: jest.fn().mockReturnValue({}),
            save: jest.fn().mockResolvedValue(fakePost),
            update: jest.fn().mockResolvedValue({}),
            softDelete: jest.fn().mockResolvedValue({}),
          };

          return runInTransaction(fakeManager);
        },
      );

      await postsService.deletePostById(1, ctxUser);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(dataSourceMock.transaction).toHaveBeenCalled();
    });

    it('should throw POST_NOT_FOUND if post not found', async (): Promise<void> => {
      const ctxUser: UserDto = { userId: 1, username: 'faithong' };

      (repositoryMock.findOne as jest.Mock).mockResolvedValue(null);
      await expect(postsService.deletePostById(1, ctxUser)).rejects.toThrow(
        new ErrorException(ErrorCode.POST_NOT_FOUND),
      );
    });

    it('should throw FORBIDDEN if user is not owner', async (): Promise<void> => {
      const ctxUser: UserDto = { userId: 1, username: 'faithong' };
      const fakePost = {
        id: 1,
        topic: Topic.FOOD,
        title: 'Have you try this pizza?',
        content: 'Pepperoni pizza is legit!',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'faithong',
        updatedBy: 'faithong',
      } as unknown as Post;

      (repositoryMock.findOne as jest.Mock).mockResolvedValue(fakePost);
      await expect(postsService.deletePostById(1, ctxUser)).rejects.toThrow(
        new ErrorException(ErrorCode.FORBIDDEN),
      );
    });

    it('should throw SERVER_ERROR when an unexpected error occurs in deletePostById', async (): Promise<void> => {
      const ctxUser: UserDto = { userId: 1, username: 'faithong' };

      (repositoryMock.findOne as jest.Mock).mockImplementation(() => {
        throw new Error('generic error');
      });
      await expect(postsService.deletePostById(1, ctxUser)).rejects.toThrowError(
        new ErrorException(ErrorCode.SERVER_ERROR, 'delete post id: 1 failed'),
      );
    });
  });

  describe('create', (): void => {
    it('should call repository.create and return the created post', (): void => {
      const data: Partial<Post> = {
        topic: Topic.FOOD,
        title: 'Have you try this pizza?',
        content: 'Pepperoni pizza is legit!',
        userId: 1,
      };

      const createdPost = { id: 1, ...data } as unknown as Post;

      (repositoryMock.create as jest.Mock).mockReturnValue(createdPost);

      const result: Post = postsService.create(data);

      expect(repositoryMock.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(createdPost);
    });
  });

  describe('save', (): void => {
    it('should call repository.save and return the saved post', async (): Promise<void> => {
      const post = {
        id: 1,
        topic: Topic.FOOD,
        title: 'Have you try this pizza?',
        content: 'Pepperoni pizza is legit!',
        userId: 1,
      } as unknown as Post;

      (repositoryMock.save as jest.Mock).mockResolvedValue(post);

      const result: Post = await postsService.save(post);

      expect(repositoryMock.save).toHaveBeenCalledWith(post);
      expect(result).toEqual(post);
    });
  });

  describe('findOne', (): void => {
    it('should call repository.findOne and return the post', async (): Promise<void> => {
      const options: FindOneOptions<Post> = { where: { id: 1 } };
      const fakePost = {
        id: 1,
        topic: Topic.FOOD,
        title: 'Have you try this pizza?',
        content: 'Pepperoni pizza is legit!',
        userId: 1,
      } as unknown as Post;

      (repositoryMock.findOne as jest.Mock).mockResolvedValue(fakePost);

      const result: Post | null = await postsService.findOne(options);

      expect(repositoryMock.findOne).toHaveBeenCalledWith(options);
      expect(result).toEqual(fakePost);
    });
  });
});
