import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'
import { ApiPath } from '@/constants'
import { ResponseDto } from '@/constants/types/api'
import { GetUserResponse } from '@/constants/types/api/users'
import { RequestClient, configApiOption } from '@/services/clients'

const getUser = async (): Promise<ResponseDto<GetUserResponse>> => {
  try {
    return await RequestClient.get(ApiPath.Users.BASE)
  } catch (error) {
    console.error('[useGetUser] Unexpected error: ', error)

    throw error
  }
}

export const useGetUser = (
  enabled: boolean,
  queryOptions: QueryOptions = {},
): UseQueryResult<ResponseDto<GetUserResponse>> => {
  return useQuery({
    queryKey: ['useGetUser'],
    queryFn: async () => enabled && (await getUser()),
    enabled,
    ...configApiOption,
    ...queryOptions,
  })
}
