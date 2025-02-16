import { ApiProperty } from '@nestjs/swagger';
import { Topic } from 'src/common/constants';
import { BaseDto, ResponseSuccess } from 'src/common/dtos';

import { CreatePostResponseExample, CreatePostResponseSuccessExample } from '../examples';

export class CreatePostResponseDto extends BaseDto {
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

export class CreatePostResponseSuccessDto extends ResponseSuccess {
  @ApiProperty({
    type: CreatePostResponseDto,
    example: CreatePostResponseSuccessExample,
    description: 'Post creation response success',
  })
  data: CreatePostResponseDto;
}
