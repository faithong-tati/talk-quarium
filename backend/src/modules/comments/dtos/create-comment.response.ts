import { ApiProperty } from '@nestjs/swagger';
import { BaseDto, ResponseSuccess } from 'src/common/dtos';

import { CreateCommentResponseExample, CreateCommentResponseSuccessExample } from '../examples';

export class CreateCommentResponseDto extends BaseDto {
  @ApiProperty({
    example: CreateCommentResponseExample.CONTENT,
    description: 'Content of the comment',
  })
  content: string;

  @ApiProperty({
    example: CreateCommentResponseExample.USER_ID,
    description: 'User ID of the comment',
  })
  userId: number;

  @ApiProperty({
    example: CreateCommentResponseExample.POST_ID,
    description: 'Post ID of the comment',
  })
  postId: number;
}

export class CreateCommentResponseSuccessDto extends ResponseSuccess {
  @ApiProperty({
    type: CreateCommentResponseDto,
    example: CreateCommentResponseSuccessExample,
    description: 'Create comment response success',
  })
  data: CreateCommentResponseDto;
}
