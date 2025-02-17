import {
  CreatePostResponseDto,
  GetPostByIdResponseDto,
  GetPostResponseData,
  GetPostsResponseDto,
  UpdatePostResponseDto,
} from '../dtos';
import { Post } from '../entities';

export class PostsDecorator {
  public static createPostResponse(post: Post): CreatePostResponseDto {
    const { deletedAt: _deletedAt, deletedBy: _deletedBy, user: _user, ...otherPostData } = post;

    return otherPostData;
  }

  public static getPostsResponse(posts: Post[], totalItems: number): GetPostsResponseDto {
    const items: GetPostResponseData[] = posts.map(post => {
      const {
        deletedAt: _deletedAt,
        deletedBy: _deletedBy,
        user,
        comments,
        ...otherPostData
      } = post;

      return {
        ...otherPostData,
        username: user.username,
        userImageUrl: user.userImageUrl,
        commentsCount: comments.length,
      };
    });

    return { items, totalItems };
  }

  public static getPostByIdResponse(post: Post): GetPostByIdResponseDto {
    const { deletedAt: _deletedAt, deletedBy: _deletedBy, user, comments, ...otherPostData } = post;

    return {
      ...otherPostData,
      username: user.username,
      userImageUrl: user.userImageUrl,
      commentsCount: comments.length,
    };
  }

  public static updatePostResponse(post: Post): UpdatePostResponseDto {
    const { deletedAt: _deletedAt, deletedBy: _deletedBy, user: _user, ...otherPostData } = post;

    return otherPostData;
  }
}
