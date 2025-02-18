import {
  QueryOptions,
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import { ApiPath } from '@/constants'
import { ResponseDto } from '@/constants/types/api'
import { GetPostsRequest, GetPostsResponse } from '@/constants/types/api/posts'
import { RequestClient, configApiOption } from '@/services/clients'
import { formatRequest } from '@/utils/helpers'

const getPublicPosts = async (
  request: GetPostsRequest,
): Promise<ResponseDto<GetPostsResponse>> => {
  try {
    const { mode, ...otherRequest } = request
    const formattedRequest = formatRequest(otherRequest)
    const apiPath =
      mode === 'public' ? ApiPath.Posts.PUBLIC : ApiPath.Posts.PASSPORT

    const apiUrl = `${apiPath}/${formattedRequest}`

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
    placeholderData: keepPreviousData,
    ...configApiOption,
    ...queryOptions,
  })
}
