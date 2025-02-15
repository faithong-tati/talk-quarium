import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T = unknown> {
  errorCode: string;
  successful: boolean;
  message: string;
  display?: string;
  data?: T;
  httpStatus?: number;
}

export class ResponseSuccess {
  @ApiProperty({ example: '00' })
  errorCode: string;

  @ApiProperty({ example: true })
  successful: boolean;

  @ApiProperty({ example: 'Success' })
  message: string;
}

export class ResponseError {
  @ApiProperty({ example: '03' })
  errorCode: string;

  @ApiProperty({ example: false })
  successful: boolean;

  @ApiProperty({ example: 'server error' })
  message: string;
}
