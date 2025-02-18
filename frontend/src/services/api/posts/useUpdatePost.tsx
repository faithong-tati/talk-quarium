import { useMutation } from '@tanstack/react-query'
import { ApiPath } from '@/constants'
import { configApiOption, RequestClient } from '@/services/clients'

import { MutationOptions, ResponseDto } from '@/constants/types/api'
import dayjs from 'dayjs'
import {
  UpdatePostRequest,
  UpdatePostResponse,
} from '@/constants/types/api/posts'

const updatePost = async (
  request: UpdatePostRequest,
): Promise<ResponseDto<UpdatePostResponse>> => {
  try {
    const { body, query } = request

    return await RequestClient.put(`${ApiPath.Posts.BASE}/${query.id}`, body)
  } catch (error) {
    console.error('[useUpdatePost] Unexpected error: ', error)

    throw error
  }
}

export const useUpdatePost = (mutationOptions: MutationOptions = {}) => {
  return useMutation({
    mutationKey: ['useUpdatePost', `${dayjs().unix()}`],
    mutationFn: async (request: UpdatePostRequest) => updatePost(request),
    ...configApiOption,
    ...mutationOptions,
  })
}
