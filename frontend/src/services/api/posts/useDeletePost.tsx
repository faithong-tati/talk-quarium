import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { ApiPath } from '@/constants'
import { MutationOptions, ResponseDto } from '@/constants/types/api'
import { RequestClient, configApiOption } from '@/services/clients'

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
