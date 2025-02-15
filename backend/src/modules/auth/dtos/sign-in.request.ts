import { ApiProperty } from '@nestjs/swagger';

import { SignInRequestExample } from '../examples';

export class SignInRequestDto {
  @ApiProperty({
    example: SignInRequestExample.USERNAME,
    description: 'Username',
  })
  username: string;
}
