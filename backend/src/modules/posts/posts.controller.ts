import { Body, Controller, Post as HttpPost, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorCode } from 'src/common/constants';
import { User } from 'src/common/decorators';
import { ResponseDto, ResponseError, UserDto } from 'src/common/dtos';
import { JwtAuthGuard } from 'src/utils/guards';
import { getResponseStatus } from 'src/utils/helpers';

import { CreatePostRequestDto, CreatePostResponseDto, CreatePostResponseSuccessDto } from './dtos';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller({
  version: ['1'],
})
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpPost('posts')
  @ApiOperation({ summary: 'Create post in TalkQuarium' })
  @ApiOkResponse({
    description: 'Post created successfully',
    type: CreatePostResponseSuccessDto,
  })
  @ApiDefaultResponse({
    description: 'Post creation failed',
    type: ResponseError,
  })
  public async create(
    @User() user: UserDto,
    @Body() createPostRequestDto: CreatePostRequestDto,
  ): Promise<ResponseDto<CreatePostResponseDto>> {
    const response = await this.postsService.createPost(user.userId, createPostRequestDto);

    return getResponseStatus(ErrorCode.SUCCESS, response);
  }
}
