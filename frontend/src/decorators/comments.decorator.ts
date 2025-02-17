import { GetCommentsByPostIdResponse } from '@/constants/types/api/comments'
import { CommentCardProps } from '@/constants/types/components/CommentCardProps'

class CommentsDecorator {
  public getCommentsByPostIdResponse(
    rawData: GetCommentsByPostIdResponse | undefined,
  ): CommentCardProps[] {
    if (!rawData) {
      return []
    }

    return rawData.items.map((item) => {
      return {
        id: item.id,
        author: item.username,
        content: item.content,
        createdAt: item.createdAt,
        userImageUrl: item.userImageUrl,
      }
    })
  }
}

export default new CommentsDecorator()
