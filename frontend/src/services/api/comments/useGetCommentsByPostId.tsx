import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'
import { ApiPath } from '@/constants'
import { ResponseDto } from '@/constants/types/api'
import {
  GetCommentsByPostIdRequest,
  GetCommentsByPostIdResponse,
} from '@/constants/types/api/comments'
import { RequestClient, configApiOption } from '@/services/clients'
import { formatRequest } from '@/utils/helpers'

const getCommentsByPostID = async (
  request: GetCommentsByPostIdRequest,
): Promise<ResponseDto<GetCommentsByPostIdResponse>> => {
  try {
    const { params, query } = request
    const formattedRequest = query ? formatRequest(query) : ''
    const apiUrl = `${ApiPath.Comments.BASE}/${params.postId}/${formattedRequest}`

    return await RequestClient.get(apiUrl)
  } catch (error) {
    console.error('[useGetCommentsByPostId] Unexpected error: ', error)

    throw error
  }
}

export const useGetCommentsByPostId = (
  request: GetCommentsByPostIdRequest,
  queryOptions: QueryOptions = {},
): UseQueryResult<ResponseDto<GetCommentsByPostIdResponse>> => {
  return useQuery({
    queryKey: ['useGetCommentsByPostId', request],
    queryFn: async () =>
      request.params.postId && (await getCommentsByPostID(request)),
    enabled: Boolean(request.params.postId),
    ...configApiOption,
    ...queryOptions,
  })
}
