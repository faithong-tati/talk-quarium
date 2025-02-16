import { ApiProperty } from '@nestjs/swagger';
import { ResponseSuccess } from 'src/common/dtos';

import { UpdatePostResponseSuccessExample } from '../examples';
import { CreatePostResponseDto } from './create-post.response';

export class UpdatePostResponseDto extends CreatePostResponseDto {}

export class UpdatePostResponseSuccessDto extends ResponseSuccess {
  @ApiProperty({
    type: UpdatePostResponseDto,
    example: UpdatePostResponseSuccessExample,
    description: 'Update post response success',
  })
  data: UpdatePostResponseDto;
}
