import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { ApiPath } from '@/constants'
import { MutationOptions, ResponseDto } from '@/constants/types/api'
import {
  CreateCommentRequest,
  CreateCommentResponse,
} from '@/constants/types/api/comments'
import { RequestClient, configApiOption } from '@/services/clients'

const createComment = async (
  request: CreateCommentRequest,
): Promise<ResponseDto<CreateCommentResponse>> => {
  try {
    const { body, params } = request

    return await RequestClient.post(
      `${ApiPath.Comments.BASE}/${params.postId}`,
      body,
    )
  } catch (error) {
    console.error('[useCreateComment] Unexpected error: ', error)

    throw error
  }
}

export const useCreateComment = (mutationOptions: MutationOptions = {}) => {
  return useMutation({
    mutationKey: ['useCreateComment', `${dayjs().unix()}`],
    mutationFn: async (request: CreateCommentRequest) => createComment(request),
    ...configApiOption,
    ...mutationOptions,
  })
}
