import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'faithong' })
  username: string;
}
