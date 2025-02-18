import { Topic } from '@/constants/enums'

export interface UpdatePostRequest {
  query: { id: number }
  body: {
    content: string
    title: string
    topic: Topic
  }
}
