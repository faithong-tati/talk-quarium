import {
  CreatePostResponseDto,
  GetPostByIdResponseDto,
  GetPostResponseData,
  GetPostsResponseDto,
} from '../dtos';
import { Post } from '../entities';

export class PostsDecorator {
  public static createPostResponse(post: Post): CreatePostResponseDto {
    const { deletedAt: _deletedAt, deletedBy: _deletedBy, user: _user, ...otherPostData } = post;

    return otherPostData;
  }

  public static getPostsResponse(posts: Post[], totalItems: number): GetPostsResponseDto {
    const items: GetPostResponseData[] = posts.map(post => {
      const { deletedAt: _deletedAt, deletedBy: _deletedBy, user, ...otherPostData } = post;

      return {
        ...otherPostData,
        username: user.username,
      };
    });

    return { items, totalItems };
  }

  public static getPostByIdResponse(post: Post): GetPostByIdResponseDto {
    const { deletedAt: _deletedAt, deletedBy: _deletedBy, user, ...otherPostData } = post;

    return {
      ...otherPostData,
      username: user.username,
    };
  }
}
