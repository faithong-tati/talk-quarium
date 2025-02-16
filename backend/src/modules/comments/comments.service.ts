import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/constants';
import { UserDto } from 'src/common/dtos';
import { ErrorException } from 'src/utils/exceptions';
import { DataSource, FindOneOptions, Repository } from 'typeorm';

import { CommentsDecorator } from './decorators';
import { CreateCommentRequestDto, CreateCommentResponseDto } from './dtos';
import { Comment } from './entities';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private postsService: PostsService,
    private usersService: UsersService,
    private dataSource: DataSource,
  ) {}

  async createComment(
    postId: number,
    args: CreateCommentRequestDto,
    userCtx: UserDto,
  ): Promise<CreateCommentResponseDto> {
    try {
      const { userId, username } = userCtx;
      const { content } = args;
      const user = await this.usersService.findOne({ id: userId });

      if (!user) {
        throw new ErrorException(ErrorCode.USER_NOT_FOUND);
      }

      const post = await this.postsService.findOne({ where: { id: postId } });

      if (!post) {
        throw new ErrorException(ErrorCode.POST_NOT_FOUND);
      }

      const savedComment = await this.dataSource.transaction(async manager => {
        const createdComment = manager.create(Comment, {
          content,
          createdBy: username,
          updatedBy: username,
          userId,
          postId,
        });

        return await manager.save(createdComment);
      });

      return CommentsDecorator.createCommentResponse(savedComment);
    } catch (error) {
      if (error instanceof ErrorException) {
        console.error('[CommentsService][createComment] Expected error:', error);

        throw error;
      }

      console.error('[CommentsService][createComment] Unexpected error: ', error);

      throw new ErrorException(ErrorCode.SERVER_ERROR, 'create comment failed');
    }
  }

  create(data: Partial<Comment>): Comment {
    return this.commentsRepository.create(data);
  }

  async save(data: Comment): Promise<Comment> {
    return this.commentsRepository.save(data);
  }

  async findOne(options: FindOneOptions<Comment>): Promise<Comment | null> {
    return this.commentsRepository.findOne(options);
  }
}
