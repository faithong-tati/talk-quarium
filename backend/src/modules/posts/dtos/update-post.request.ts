import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Topic } from 'src/common/constants';

import { CreatePostRequestExample } from '../examples';

export class UpdatePostRequestDto {
  @ApiProperty({
    example: CreatePostRequestExample.TOPIC,
    description: 'Topic of the post',
  })
  @IsNotEmpty()
  @IsEnum(Topic)
  topic: Topic;

  @ApiProperty({
    example: CreatePostRequestExample.TITLE,
    description: 'Title of the post',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: CreatePostRequestExample.CONTENT,
    description: 'Content of the post',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
