import { Topic } from '@/constants/enums'
import { SxProps } from '@mui/material'

export interface CommentCardProps {
  id: number
  author: string
  content: string
  createdAt: Date
  imageUrl: string
}
