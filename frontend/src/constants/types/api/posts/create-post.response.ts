import { Topic } from '@/constants/enums'
import { BaseResponse } from '../base.response'

export interface CreatePostResponse extends BaseResponse {
  content: string
  title: string
  topic: Topic
  userId: number
}
