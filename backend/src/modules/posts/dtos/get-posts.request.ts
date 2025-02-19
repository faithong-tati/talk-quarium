import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { Topic } from 'src/common/constants';
import { Regex } from 'src/common/constants/regex';

export class GetPostsPublicRequestDto {
  @ApiProperty({
    description: 'Filtered by title',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Filtered by topic',
    required: false,
    enum: Topic,
  })
  @IsOptional()
  @IsEnum(Topic)
  topic?: Topic;

  @ApiProperty({
    description: 'Filtered by username',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(Regex.USERNAME)
  username?: string;

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

export class GetPostsPassportRequestDto extends GetPostsPublicRequestDto {}
