import { ApiProperty } from '@nestjs/swagger';

export class GetCommentsRequestDto {
  @ApiProperty({
    description: 'Offset',
    required: false,
    default: 0,
  })
  offset?: number;

  @ApiProperty({
    description: 'Limit',
    required: false,
    default: 10,
  })
  limit?: number;
}
