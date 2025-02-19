import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateCommentRequestExample } from '../examples';

export class CreateCommentRequestDto {
  @ApiProperty({
    example: CreateCommentRequestExample.CONTENT,
    description: 'Content of the comment',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
