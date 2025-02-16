import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/constants';
import { UserDto } from 'src/common/dtos';
import { ErrorException } from 'src/utils/exceptions';
import { FindOneOptions, Repository } from 'typeorm';

import { PostsDecorator } from './decorators';
import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  GetPostByIdResponseDto,
  GetPostsPassportRequestDto,
  GetPostsResponseDto,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
} from './dtos';
import { Post } from './entities';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async createPost(
    userCtx: UserDto,
    createPostDto: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    try {
      const { userId, username } = userCtx;

      if (!userId) {
        throw new ErrorException(ErrorCode.USER_NOT_FOUND);
      }

      const { content, title, topic } = createPostDto;
      const author = username;
      const createdPost = this.create({
        topic,
        title,
        content,
        createdBy: author,
        updatedBy: author,
        userId,
      });

      const savedPost = await this.save(createdPost);

      return PostsDecorator.createPostResponse(savedPost);
    } catch (error) {
      if (error instanceof ErrorException) {
        console.error('[PostsService][createPost] Expected error:', error);

        throw error;
      }

      console.error('[PostsService][createPost] Unexpected error: ', error);

      throw new ErrorException(ErrorCode.SERVER_ERROR, 'create post failed');
    }
  }

  // TODO: must join with comments later
  async getPosts(
    args: GetPostsPassportRequestDto,
    userCtx?: UserDto,
  ): Promise<GetPostsResponseDto> {
    try {
      const userIdCtx = userCtx?.userId;
      const qb = this.postsRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .select(['post', 'user.id', 'user.username']);

      if (args?.topic) {
        qb.andWhere('post.topic = :topic', { topic: args.topic });
      }

      if (args?.title) {
        qb.andWhere('post.title LIKE :title', { title: `%${args.title}%` });
      }

      if (args?.username) {
        qb.andWhere('user.username LIKE :username', { username: `%${args.username}%` });
      }

      if (args?.userId) {
        const argUserId = Number(args.userId);

        if (userIdCtx && argUserId !== userIdCtx) {
          throw new ErrorException(ErrorCode.FORBIDDEN);
        } else {
          qb.andWhere('user.id = :userId', { userId: argUserId });
        }
      }

      qb.orderBy('post.createdAt', 'DESC');
      qb.skip(args.offset).take(args.limit);

      const response = await qb.getMany();
      const totalItems = await qb.getCount();

      return PostsDecorator.getPostsResponse(response, totalItems);
    } catch (error) {
      if (error instanceof ErrorException) {
        console.error('[PostsService][getPosts] Expected error:', error);

        throw error;
      }

      console.error('[PostsService][getPosts] Unexpected error: ', error);

      throw new ErrorException(ErrorCode.SERVER_ERROR, 'get posts failed');
    }
  }

  // TODO: must join with comments later
  async getPostById(id: number): Promise<GetPostByIdResponseDto> {
    try {
      const post = await this.findOne({ where: { id } });

      if (!post) {
        throw new ErrorException(ErrorCode.POST_NOT_FOUND);
      }

      return PostsDecorator.getPostByIdResponse(post);
    } catch (error) {
      if (error instanceof ErrorException) {
        console.error('[PostsService][getPostById] Expected error:', error);

        throw error;
      }

      console.error('[PostsService][getPostById] Unexpected error: ', error);

      throw new ErrorException(ErrorCode.SERVER_ERROR, 'get post failed');
    }
  }

  async updatePostById(
    id: number,
    args: UpdatePostRequestDto,
    ctxUser: UserDto,
  ): Promise<UpdatePostResponseDto> {
    try {
      const { topic, title, content } = args;
      const { userId, username } = ctxUser;
      const post = await this.findOne({ where: { id } });

      if (!post) {
        throw new ErrorException(ErrorCode.POST_NOT_FOUND);
      }

      if (post.userId !== userId) {
        throw new ErrorException(ErrorCode.FORBIDDEN);
      }

      const response = await this.postsRepository.save({
        ...post,
        topic,
        title,
        content,
        updatedBy: username,
      });

      return PostsDecorator.updatePostResponse(response);
    } catch (error) {
      if (error instanceof ErrorException) {
        console.error('[PostsService][updatePostById] Expected error:', error);

        throw error;
      }

      console.error('[PostsService][updatePostById] Unexpected error: ', error);

      throw new ErrorException(ErrorCode.SERVER_ERROR, `update post id: ${id} failed`);
    }
  }

  create(data: Partial<Post>): Post {
    return this.postsRepository.create(data);
  }

  async save(data: Post): Promise<Post> {
    return this.postsRepository.save(data);
  }

  async findOne(options: FindOneOptions<Post>): Promise<Post | null> {
    return this.postsRepository.findOne(options);
  }

  // async delete(id: number): Promise<void> {
  //   await this.postsRepository.delete(id);
  // }
}
