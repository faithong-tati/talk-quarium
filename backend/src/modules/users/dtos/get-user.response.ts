import { ApiProperty } from '@nestjs/swagger';
import { ResponseSuccess } from 'src/common/dtos';

import { GetCommentsResponseSuccessExample, GetUserResponseExample } from '../examples';

export class GetUserResponseDto {
  @ApiProperty({
    example: GetUserResponseExample.USERNAME,
    description: 'Username',
  })
  username: string;

  @ApiProperty({
    example: GetUserResponseExample.USER_ID,
    description: 'User ID',
  })
  userId: number;

  @ApiProperty({
    example: GetUserResponseExample.USER_IMAGE_URL,
    description: 'User ID',
  })
  userImageUrl: string;
}

export class GetUserResponseSuccessDto extends ResponseSuccess {
  @ApiProperty({
    type: GetUserResponseDto,
    example: GetCommentsResponseSuccessExample,
    description: 'Get user response success',
  })
  data: GetUserResponseDto;
}
