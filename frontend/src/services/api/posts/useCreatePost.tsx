import { useMutation } from '@tanstack/react-query'
import { ApiPath } from '@/constants'
import { configApiOption, RequestClient } from '@/services/clients'

import { MutationOptions, ResponseDto } from '@/constants/types/api'
import dayjs from 'dayjs'
import {
  CreatePostRequest,
  CreatePostResponse,
} from '@/constants/types/api/posts'

const createPost = async (
  request: CreatePostRequest,
): Promise<ResponseDto<CreatePostResponse>> => {
  try {
    return await RequestClient.post(ApiPath.Posts.BASE, request)
  } catch (error) {
    console.error('[useCreatePost] Unexpected error: ', error)

    throw error
  }
}

export const useCreatePost = (mutationOptions: MutationOptions = {}) => {
  return useMutation({
    mutationKey: ['useCreatePost', `${dayjs().unix()}`],
    mutationFn: async (request: CreatePostRequest) => createPost(request),
    ...configApiOption,
    ...mutationOptions,
  })
}
