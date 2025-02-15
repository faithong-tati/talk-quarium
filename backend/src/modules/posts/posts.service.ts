import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/constants';
import { ErrorException } from 'src/utils/exceptions';
import { Repository } from 'typeorm';

import { PostsDecorator } from './decorators';
import { CreatePostRequestDto, CreatePostResponseDto } from './dtos';
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
    userId: number,
    createPostDto: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    try {
      const { content, title, topic } = createPostDto;
      const user = await this.usersService.findOne({ id: userId });
      const author = user?.username;
      const response = await this.create({
        topic,
        title,
        content,
        createdBy: author,
        updatedBy: author,
      });

      return PostsDecorator.createPostResponse(response);
    } catch (error) {
      if (error instanceof ErrorException) {
        console.error('[PostsService][create] Expected error:', error);

        throw error;
      }

      console.error('[PostsService][create] Unexpected error: ', error);

      throw new ErrorException(ErrorCode.SERVER_ERROR, 'create post failed');
    }
  }

  async create(data: Partial<Post>): Promise<Post> {
    const posts = this.postsRepository.create(data);

    return this.postsRepository.save(posts);
  }
}
