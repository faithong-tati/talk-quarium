import { ApiProperty } from '@nestjs/swagger';
import { ResponseSuccess } from 'src/common/dtos';

import { SignInResponseExample } from '../examples';

export class SignInResponseDto {
  @ApiProperty({
    example: SignInResponseExample.accessToken,
    description: 'Access Token',
  })
  accessToken: string;

  @ApiProperty({
    example: SignInResponseExample.userId,
    description: 'User ID',
  })
  userId: number;

  @ApiProperty({
    example: SignInResponseExample.username,
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
