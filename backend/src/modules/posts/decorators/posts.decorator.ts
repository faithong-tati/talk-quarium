import { CreatePostResponseDto, GetPostsResponseDto } from '../dtos';
import { Post } from '../entities';

export class PostsDecorator {
  public static createPostResponse(post: Post): CreatePostResponseDto {
    const { deletedAt: _deletedAt, deletedBy: _deletedBy, user: _user, ...otherPostData } = post;

    return otherPostData;
  }

  public static getPostsResponse(posts: Post[], totalItems: number): GetPostsResponseDto {
    const items = posts.map(post => {
      const { deletedAt: _deletedAt, deletedBy: _deletedBy, user: _user, ...otherPostData } = post;

      return otherPostData;
    });

    return { items, totalItems };
  }
}
