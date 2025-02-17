import { Topic } from '@/constants/enums'
import { BaseResponse } from '../base.response'

export interface GetPostResponse extends BaseResponse {
  topic: Topic
  title: string
  content: string
  username: string
  userId: number
  userImageUrl: string
  commentsCount: number
}
