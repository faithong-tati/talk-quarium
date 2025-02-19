import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
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

import { CommentsService } from './comments.service';
import {
  CreateCommentRequestDto,
  CreateCommentResponseDto,
  CreateCommentResponseSuccessDto,
  GetCommentsRequestDto,
  GetCommentsResponseDto,
  GetCommentsResponseSuccessDto,
} from './dtos';

@ApiTags('comments')
@Controller({
  version: ['1'],
  path: 'comments',
})
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/:postId')
  @ApiOperation({ summary: 'Create comment in TalkQuarium' })
  @ApiOkResponse({
    description: 'Create comment successfully',
    type: CreateCommentResponseSuccessDto,
  })
  @ApiDefaultResponse({
    description: 'Create comment failed',
    type: ResponseError,
  })
  async createComment(
    @User() userCtx: UserDto,
    @Param('postId') postId: number,
    @Body() createCommentRequestDto: CreateCommentRequestDto,
  ): Promise<ResponseDto<CreateCommentResponseDto>> {
    const response = await this.commentsService.createComment(
      Number(postId),
      createCommentRequestDto,
      userCtx,
    );

    return getResponseStatus(ErrorCode.SUCCESS, response);
  }

  @Get('/:postId')
  @ApiOperation({ summary: 'Get comments by post in TalkQuarium' })
  @ApiOkResponse({
    description: 'Get comments by post successfully',
    type: GetCommentsResponseSuccessDto,
  })
  @ApiDefaultResponse({
    description: 'Get comments by post failed',
    type: ResponseError,
  })
  async getComments(
    @Param('postId') postId: number,
    @Query() getCommentsRequestDto: GetCommentsRequestDto,
  ): Promise<ResponseDto<GetCommentsResponseDto>> {
    const response = await this.commentsService.getComments(Number(postId), getCommentsRequestDto);

    return getResponseStatus(ErrorCode.SUCCESS, response);
  }
}
