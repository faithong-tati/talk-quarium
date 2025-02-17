import { GetPostResponse, GetPostsResponse } from '@/constants/types/api/posts'
import { PostCardProps } from '@/constants/types/components'

class PostsDecorator {
  public getPostsResponse(
    rawData: GetPostsResponse | undefined,
  ): PostCardProps[] {
    if (!rawData) {
      return []
    }

    return rawData.items.map((item) => {
      return {
        id: item.id,
        author: item.username,
        commentsCount: item.commentsCount,
        content: item.content,
        userImageUrl: item.userImageUrl,
        title: item.title,
        topic: item.topic,
        updatedAt: item.updatedAt,
      }
    })
  }

  public getPostById(rawData: GetPostResponse | undefined): PostCardProps {
    if (!rawData) {
      return {} as PostCardProps
    }

    return {
      id: rawData.id,
      author: rawData.username,
      commentsCount: rawData.commentsCount,
      content: rawData.content,
      userImageUrl: rawData.userImageUrl,
      title: rawData.title,
      topic: rawData.topic,
      updatedAt: rawData.updatedAt,
    }
  }
}

export default new PostsDecorator()
