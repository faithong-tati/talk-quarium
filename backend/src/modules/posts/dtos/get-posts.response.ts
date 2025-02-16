import { ApiProperty } from '@nestjs/swagger';
import { Topic } from 'src/common/constants';
import { BaseDto, ResponseSuccess } from 'src/common/dtos';

import { CreatePostResponseExample } from '../examples';

class GetPostsResponseData extends BaseDto {
  @ApiProperty({
    example: CreatePostResponseExample.TOPIC,
    description: 'Topic of the post',
  })
  topic: Topic;

  @ApiProperty({
    example: CreatePostResponseExample.TITLE,
    description: 'Title of the post',
  })
  title: string;

  @ApiProperty({
    example: CreatePostResponseExample.CONTENT,
    description: 'Content of the post',
  })
  content: string;
}

export class GetPostsResponseDto {
  items: GetPostsResponseData[];
  totalItems: number;
}

export class GetPostsResponseSuccessDto extends ResponseSuccess {
  @ApiProperty({
    type: GetPostsResponseDto,
    description: 'Post creation response success',
  })
  data: GetPostsResponseDto;
}
