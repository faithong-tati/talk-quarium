import { Topic } from '@/constants/enums'
import { SxProps } from '@mui/material'

export interface PostCardProps {
  author: string
  commentsCount: number
  content: string
  imageUrl: string
  title: string
  topic: Topic
}
