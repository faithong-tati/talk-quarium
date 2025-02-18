import { Topic } from '@/constants/enums'

export interface GetPostsRequest {
  limit?: number
  offset?: number
  title?: string
  topic?: Topic
  username?: string
  mode?: 'public' | 'private'
}
