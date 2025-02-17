import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'
import { ApiPath } from '@/constants'
import {
  configApiOption,
  RequestClient,
} from '@/services/clients'
import { GetPostsRequest, GetPostsResponse } from '@/constants/types/api/posts'
import { ResponseDto } from '@/constants/types/api'
import { formatRequest } from '@/utils/helpers'

const getPublicPosts = async (request: GetPostsRequest): Promise<ResponseDto<GetPostsResponse>> => {
  try {
    const formattedRequest = formatRequest(request)
    const apiUrl = `${ApiPath.Posts.PUBLIC}/${formattedRequest}`

    return await RequestClient.get(apiUrl)
  } catch (error) {
    console.error('[useGetPublicPosts] Unexpected error: ', error)

    throw error
  }
}

export const useGetPublicPosts = (
  request: GetPostsRequest,
  queryOptions: QueryOptions = {},
): UseQueryResult<ResponseDto<GetPostsResponse>> => {
  return useQuery({
    queryKey: ['useGetPublicPosts', request],
    queryFn: async () => await getPublicPosts(request),
    ...configApiOption,
    ...queryOptions,
  })
}
