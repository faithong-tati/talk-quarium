import { Topic } from '@/constants/enums'

export interface CreatePostRequest {
  content: string
  title: string
  topic: Topic
}
