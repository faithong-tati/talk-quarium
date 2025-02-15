import { CreatePostResponseDto } from '../dtos';
import { Post } from '../entities';

export class PostsDecorator {
  public static createPostResponse(post: Post): CreatePostResponseDto {
    const { deletedAt: _deletedAt, deletedBy: _deletedBy, ...otherPostData } = post;

    return otherPostData;
  }
}
