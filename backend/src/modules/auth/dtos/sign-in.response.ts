import { ApiProperty } from '@nestjs/swagger';
import { ResponseSuccess } from 'src/common/dtos';

import { SignInResponseExample } from '../examples';

export class SignInResponseDto {
  @ApiProperty({
    example: SignInResponseExample.ACCESS_TOKEN,
    description: 'Access Token',
  })
  accessToken: string;

  @ApiProperty({
    example: SignInResponseExample.USER_ID,
    description: 'User ID',
  })
  userId: number;

  @ApiProperty({
    example: SignInResponseExample.USERNAME,
    description: 'Username',
  })
  username: string;
}

export class SignInResponseSuccessDto extends ResponseSuccess {
  @ApiProperty({
    type: SignInResponseDto,
    description: 'Sign-in response success',
  })
  data: SignInResponseDto;
}
