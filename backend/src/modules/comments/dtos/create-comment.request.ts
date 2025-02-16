import { ApiProperty } from '@nestjs/swagger';

import { CreateCommentRequestExample } from '../examples';

export class CreateCommentRequestDto {
  @ApiProperty({
    example: CreateCommentRequestExample.CONTENT,
    description: 'Content of the comment',
  })
  content: string;
}
