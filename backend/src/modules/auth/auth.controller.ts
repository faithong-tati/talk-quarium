import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiDefaultResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorCode } from 'src/common/constants';
import { ResponseDto, ResponseError } from 'src/common/dtos';
import { getResponseStatus } from 'src/utils/helpers';

import { AuthService } from './auth.service';
import { SignInRequestDto } from './dtos';
import { SignInResponseDto, SignInResponseSuccessDto } from './dtos/sign-in.response';

@ApiTags('auth')
@Controller({
  version: ['1'],
})
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiBadRequestResponse({ description: 'Invalid Input' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign-in to access TalkQuarium features' })
  @ApiOkResponse({
    description: 'Sign-in was successful',
    type: SignInResponseSuccessDto,
  })
  @ApiDefaultResponse({
    description: 'Sign-in failed',
    type: ResponseError,
  })
  public async signIn(
    @Body() signInRequestDto: SignInRequestDto,
  ): Promise<ResponseDto<SignInResponseDto>> {
    const response = await this.authService.signIn(signInRequestDto.username);

    return getResponseStatus(ErrorCode.SUCCESS, response);
  }
}
