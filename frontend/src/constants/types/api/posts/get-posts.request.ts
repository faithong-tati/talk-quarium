import { Topic } from '@/constants/enums'
import { GetPostResponse } from './get-post.response'

export interface GetPostsRequest {
  limit?: number
  offset?: number
  title?: string
  topic?: Topic
  username?: string
}
