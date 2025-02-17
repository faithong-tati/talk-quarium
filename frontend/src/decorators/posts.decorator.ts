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
        imageUrl: `https://picsum.photos/seed/${item.userId}/500/300`,
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
      imageUrl: `https://picsum.photos/seed/${rawData.userId}/500/300`,
      title: rawData.title,
      topic: rawData.topic,
      updatedAt: rawData.updatedAt,
    }
  }
}

export default new PostsDecorator()
