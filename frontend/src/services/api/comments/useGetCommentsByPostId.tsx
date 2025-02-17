import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'
import { ApiPath } from '@/constants'
import { configApiOption, RequestClient } from '@/services/clients'

import { ResponseDto } from '@/constants/types/api'
import { formatRequest } from '@/utils/helpers'
import {
  GetCommentsByPostIdRequest,
  GetCommentsByPostIdResponse,
} from '@/constants/types/api/comments'

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
