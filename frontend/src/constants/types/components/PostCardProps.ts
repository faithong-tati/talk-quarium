import { Topic } from '@/constants/enums'

export interface PostCardProps {
  id: number
  author: string
  commentsCount: number
  content: string
  title: string
  topic: Topic
  updatedAt: Date
  userImageUrl: string
}
