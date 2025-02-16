import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
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
} from './dtos';

@ApiTags('comments')
@Controller({
  version: ['1'],
})
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('comments/:postId')
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
}
