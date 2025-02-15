import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ example: 'faithong' })
  createdBy: string;

  @ApiProperty({ example: 'faithong' })
  updatedBy: string;
}
