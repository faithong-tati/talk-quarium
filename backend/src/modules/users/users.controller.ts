import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorCode } from 'src/common/constants';
import { User } from 'src/common/decorators';
import { ResponseDto, ResponseError, UserDto } from 'src/common/dtos';
import { JwtAuthGuard } from 'src/utils/guards';
import { getResponseStatus } from 'src/utils/helpers';

import { GetUserResponseDto, GetUserResponseSuccessDto } from './dtos';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller({
  version: ['1'],
  path: 'users',
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get user in TalkQuarium' })
  @ApiOkResponse({
    description: 'Get user successfully',
    type: GetUserResponseSuccessDto,
  })
  @ApiDefaultResponse({
    description: 'Get user failed',
    type: ResponseError,
  })
  async getUser(@User() userCtx: UserDto): Promise<ResponseDto<GetUserResponseDto>> {
    const response = await this.usersService.getUser(userCtx);

    return getResponseStatus(ErrorCode.SUCCESS, response);
  }
}
