import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetCommentsRequestDto {
  @ApiProperty({
    description: 'Offset',
    required: false,
    default: 0,
  })
  @IsOptional()
  offset?: number;

  @ApiProperty({
    description: 'Limit',
    required: false,
    default: 10,
  })
  @IsOptional()
  limit?: number;
}
