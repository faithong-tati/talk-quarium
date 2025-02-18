export interface CreateCommentRequest {
  body?: { content: string }
  params: { postId: number }
}
