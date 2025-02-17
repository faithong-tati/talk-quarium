import { CreateCommentResponseDto, GetCommentsResponseData, GetCommentsResponseDto } from '../dtos';
import { Comment } from '../entities';

export class CommentsDecorator {
  public static createCommentResponse(comment: Comment): CreateCommentResponseDto {
    const {
      deletedAt: _deletedAt,
      deletedBy: _deletedBy,
      user: _user,
      post: _post,
      ...otherCommentData
    } = comment;

    return { ...otherCommentData };
  }

  public static getCommentsResponse(
    comments: Comment[],
    totalItems: number,
  ): GetCommentsResponseDto {
    const items: GetCommentsResponseData[] = comments.map(comment => {
      const {
        deletedAt: _deletedAt,
        deletedBy: _deletedBy,
        user,
        post: _post,
        ...otherCommentData
      } = comment;

      return {
        ...otherCommentData,
        username: user.username,
        userImageUrl: user.userImageUrl,
      };
    });

    return { items, totalItems };
  }
}
