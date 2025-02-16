import { ApiProperty } from '@nestjs/swagger';
import { Topic } from 'src/common/constants';
import { BaseDto, ResponseSuccess } from 'src/common/dtos';

import { GetPostsResponseExample, GetPostsResponseSuccessExample } from '../examples';

export class GetPostResponseData extends BaseDto {
  @ApiProperty({
    example: GetPostsResponseExample.TOPIC,
    description: 'Topic of the post',
  })
  topic: Topic;

  @ApiProperty({
    example: GetPostsResponseExample.TITLE,
    description: 'Title of the post',
  })
  title: string;

  @ApiProperty({
    example: GetPostsResponseExample.CONTENT,
    description: 'Content of the post',
  })
  content: string;

  @ApiProperty({
    example: GetPostsResponseExample.USERNAME,
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
    example: GetPostsResponseSuccessExample,
    description: 'Get posts response success',
  })
  data: GetPostsResponseDto;
}
