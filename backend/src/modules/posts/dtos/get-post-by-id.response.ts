import { ApiProperty } from '@nestjs/swagger';
import { ResponseSuccess } from 'src/common/dtos';

import { GetPostResponseData } from './get-posts.response';
import { GetPostByIdResponseSuccessExample } from '../examples';

export class GetPostByIdResponseDto extends GetPostResponseData {}

export class GetPostByIdResponseSuccessDto extends ResponseSuccess {
  @ApiProperty({
    type: GetPostResponseData,
    example: GetPostByIdResponseSuccessExample,
    description: 'Get post by id response success',
  })
  data: GetPostResponseData;
}
