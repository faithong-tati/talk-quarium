export interface GetCommentsByPostIdRequest {
  query?: { offset: number; limit: number }
  params: { postId: number }
}
