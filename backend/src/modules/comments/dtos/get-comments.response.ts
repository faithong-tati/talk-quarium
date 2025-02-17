import { ApiProperty } from '@nestjs/swagger';
import { BaseDto, ResponseSuccess } from 'src/common/dtos';

import { GetCommentsResponseExample, GetCommentsResponseSuccessExample } from '../examples';

export class GetCommentsResponseData extends BaseDto {
  @ApiProperty({
    example: GetCommentsResponseExample.CONTENT,
    description: 'Content of the comment',
  })
  content: string;

  @ApiProperty({
    example: GetCommentsResponseExample.USERNAME,
    description: 'Author of the comment',
  })
  username: string;

  @ApiProperty({
    example: GetCommentsResponseExample.USER_ID,
    description: 'User ID of the comment',
  })
  userId: number;

  @ApiProperty({
    example: GetCommentsResponseExample.USER_IMAGE_URL,
    description: 'User image url of the comment',
  })
  userImageUrl: string;

  @ApiProperty({
    example: GetCommentsResponseExample.POST_ID,
    description: 'Post ID of the comment',
  })
  postId: number;
}

export class GetCommentsResponseDto {
  items: GetCommentsResponseData[];
  totalItems: number;
}

export class GetCommentsResponseSuccessDto extends ResponseSuccess {
  @ApiProperty({
    type: GetCommentsResponseDto,
    example: GetCommentsResponseSuccessExample,
    description: 'Get comments response success',
  })
  data: GetCommentsResponseDto;
}
