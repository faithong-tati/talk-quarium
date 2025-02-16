import { ApiProperty } from '@nestjs/swagger';
import { Topic } from 'src/common/constants';

export class GetPostsPublicRequestDto {
  @ApiProperty({
    description: 'Filtered by title',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'Filtered by topic',
    required: false,
    enum: Topic,
  })
  topic?: Topic;

  @ApiProperty({
    description: 'Filtered by username',
    required: false,
  })
  username?: string;

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

export class GetPostsPassportRequestDto extends GetPostsPublicRequestDto {
  @ApiProperty({
    description: 'Filtered by userId',
    required: false,
  })
  userId?: number;
}
