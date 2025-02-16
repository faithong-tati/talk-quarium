import { CreateCommentResponseDto } from '../dtos';
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
}
