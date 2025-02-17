import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'
import { ApiPath } from '@/constants'
import { configApiOption, RequestClient } from '@/services/clients'

import { ResponseDto } from '@/constants/types/api'
import { GetPostResponse } from '@/constants/types/api/posts'

const getPostById = async (
  id: number,
): Promise<ResponseDto<GetPostResponse>> => {
  try {
    const apiUrl = `${ApiPath.Posts.BASE}/${id}`

    return await RequestClient.get(apiUrl)
  } catch (error) {
    console.error('[useGetPostById] Unexpected error: ', error)

    throw error
  }
}

export const useGetPostById = (
  id: number,
  queryOptions: QueryOptions = {},
): UseQueryResult<ResponseDto<GetPostResponse>> => {
  return useQuery({
    queryKey: ['useGetPostById', id],
    queryFn: async () => id && (await getPostById(id)),
    enabled: Boolean(id),
    ...configApiOption,
    ...queryOptions,
  })
}
