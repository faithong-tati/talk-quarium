import { BaseResponse } from '../base.response'

export interface GetCommentByPostIdResponse extends BaseResponse {
  content: string
  username: string
  userId: number
  userImageUrl: string
  postId: number
}

export interface GetCommentsByPostIdResponse {
  items: GetCommentByPostIdResponse[]
  totalItems: number
}
