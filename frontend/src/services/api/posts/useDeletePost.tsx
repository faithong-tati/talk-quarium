import { useMutation } from '@tanstack/react-query'
import { ApiPath } from '@/constants'
import { configApiOption, RequestClient } from '@/services/clients'

import { MutationOptions, ResponseDto } from '@/constants/types/api'
import dayjs from 'dayjs'

const deletePost = async (id: number): Promise<ResponseDto> => {
  try {
    return await RequestClient.delete(`${ApiPath.Posts.BASE}/${id}`)
  } catch (error) {
    console.error('[useDeletePost] Unexpected error: ', error)

    throw error
  }
}

export const useDeletePost = (mutationOptions: MutationOptions = {}) => {
  return useMutation({
    mutationKey: ['useDeletePost', `${dayjs().unix()}`],
    mutationFn: async (id: number) => deletePost(id),
    ...configApiOption,
    ...mutationOptions,
  })
}
