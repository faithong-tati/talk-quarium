import { ApiProperty } from '@nestjs/swagger';

import { BaseResponseExample } from '../examples';

export class BaseDto {
  @ApiProperty({ example: BaseResponseExample.ISSUED_AT })
  createdAt: Date;

  @ApiProperty({ example: BaseResponseExample.ISSUED_AT })
  updatedAt: Date;

  @ApiProperty({ example: BaseResponseExample.USERNAME })
  createdBy: string;

  @ApiProperty({ example: BaseResponseExample.USERNAME })
  updatedBy: string;
}
