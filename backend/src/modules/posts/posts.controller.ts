import {
  Body,
  Controller,
  Delete,
  Get,
  Post as HttpPost,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorCode } from 'src/common/constants';
import { User } from 'src/common/decorators';
import { ResponseDto, ResponseError, ResponseSuccess, UserDto } from 'src/common/dtos';
import { JwtAuthGuard } from 'src/utils/guards';
import { getResponseStatus } from 'src/utils/helpers';

import {
  CreatePostRequestDto,
  CreatePostResponseDto,
  CreatePostResponseSuccessDto,
  GetPostByIdResponseDto,
  GetPostByIdResponseSuccessDto,
  GetPostsPassportRequestDto,
  GetPostsPublicRequestDto,
  GetPostsResponseDto,
  GetPostsResponseSuccessDto,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
  UpdatePostResponseSuccessDto,
} from './dtos';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller({
  version: ['1'],
  path: 'posts',
})
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpPost()
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

  @Get('/public')
  @ApiOperation({ summary: 'Get public posts in TalkQuarium' })
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
  @Get('/passport')
  @ApiOperation({ summary: 'Get personalized posts in TalkQuarium' })
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

  @Get('/:id')
  @ApiOperation({ summary: 'Get post by id in TalkQuarium' })
  @ApiOkResponse({
    description: 'Get post by id successfully',
    type: GetPostByIdResponseSuccessDto,
  })
  @ApiDefaultResponse({
    description: 'Get post by id failed',
    type: ResponseError,
  })
  async getPostById(@Param('id') id: number): Promise<ResponseDto<GetPostByIdResponseDto>> {
    const response = await this.postsService.getPostById(id);

    return getResponseStatus(ErrorCode.SUCCESS, response);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiOperation({ summary: 'Update post by id in TalkQuarium' })
  @ApiOkResponse({
    description: 'Update post by id successfully',
    type: UpdatePostResponseSuccessDto,
  })
  @ApiDefaultResponse({
    description: 'Update post by id failed',
    type: ResponseError,
  })
  async updatePostById(
    @User() userCtx: UserDto,
    @Param('id') id: number,
    @Body() updatePostRequestDto: UpdatePostRequestDto,
  ): Promise<ResponseDto<UpdatePostResponseDto>> {
    const response = await this.postsService.updatePostById(id, updatePostRequestDto, userCtx);

    return getResponseStatus(ErrorCode.SUCCESS, response);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete post by id in TalkQuarium' })
  @ApiOkResponse({
    description: 'Delete post by id successfully',
    type: ResponseSuccess,
  })
  @ApiDefaultResponse({
    description: 'Delete post by id failed',
    type: ResponseError,
  })
  async deletePostById(@User() userCtx: UserDto, @Param('id') id: number): Promise<ResponseDto> {
    await this.postsService.deletePostById(id, userCtx);

    return getResponseStatus(ErrorCode.SUCCESS, undefined);
  }
}
