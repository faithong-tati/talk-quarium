import { ApiProperty } from '@nestjs/swagger';
import { Topic } from 'src/common/constants';
import { BaseDto, ResponseSuccess } from 'src/common/dtos';

import { CreatePostResponseExample } from '../examples';

export class GetPostResponseData extends BaseDto {
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

  @ApiProperty({
    example: 'faithong',
    description: 'Author of the post',
  })
  username: string;
}

export class GetPostsResponseDto {
  items: GetPostResponseData[];
  totalItems: number;
}

export class GetPostsResponseSuccessDto extends ResponseSuccess {
  @ApiProperty({
    type: GetPostsResponseDto,
    description: 'Get posts response success',
  })
  data: GetPostsResponseDto;
}
