import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Regex } from 'src/common/constants/regex';

import { SignInRequestExample } from '../examples';

export class SignInRequestDto {
  @ApiProperty({
    example: SignInRequestExample.USERNAME,
    description: 'Username',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(Regex.USERNAME)
  username: string;
}
