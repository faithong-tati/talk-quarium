import { Body, Controller, Get, Post as HttpPost, Query, UseGuards } from '@nestjs/common';
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

import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  CreatePostResponseSuccessDto,
  GetPostsPassportRequestDto,
  GetPostsPublicRequestDto,
  GetPostsResponseDto,
  GetPostsResponseSuccessDto,
} from './dtos';
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
    @User() userCtx: UserDto,
    @Body() createPostRequestDto: CreatePostRequestDto,
  ): Promise<ResponseDto<CreatePostResponseDto>> {
    const response = await this.postsService.createPost(userCtx, createPostRequestDto);

    return getResponseStatus(ErrorCode.SUCCESS, response);
  }

  @Get('posts/public')
  @ApiOperation({ summary: 'Get posts in TalkQuarium' })
  @ApiOkResponse({
    description: 'Get public posts successfully',
    type: GetPostsResponseSuccessDto,
  })
  @ApiDefaultResponse({
    description: 'Get public posts failed',
    type: ResponseError,
  })
  async getPostsPublic(
    @Query() getPostsPublicRequestDto: GetPostsPublicRequestDto,
  ): Promise<ResponseDto<GetPostsResponseDto>> {
    const response = await this.postsService.getPosts(getPostsPublicRequestDto);

    return getResponseStatus(ErrorCode.SUCCESS, response);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('posts/passport')
  @ApiOperation({ summary: 'Get posts in TalkQuarium' })
  @ApiOkResponse({
    description: 'Get personalized posts successfully',
    type: GetPostsResponseSuccessDto,
  })
  @ApiDefaultResponse({
    description: 'Get personalized posts failed',
    type: ResponseError,
  })
  async getPostsPassport(
    @User() userCtx: UserDto,
    @Query() getPostsPassportRequestDto: GetPostsPassportRequestDto,
  ): Promise<ResponseDto<GetPostsResponseDto>> {
    const response = await this.postsService.getPosts(getPostsPassportRequestDto, userCtx);

    return getResponseStatus(ErrorCode.SUCCESS, response);
  }
}
