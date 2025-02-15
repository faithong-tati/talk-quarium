import { ApiProperty } from '@nestjs/swagger';
import { Topic } from 'src/common/constants';

import { CreatePostRequestExample } from '../examples';

export class CreatePostRequestDto {
  @ApiProperty({
    example: CreatePostRequestExample.TOPIC,
    description: 'Topic of the post',
  })
  topic: Topic;

  @ApiProperty({
    example: CreatePostRequestExample.TITLE,
    description: 'Title of the post',
  })
  title: string;

  @ApiProperty({
    example: CreatePostRequestExample.CONTENT,
    description: 'Content of the post',
  })
  content: string;
}
