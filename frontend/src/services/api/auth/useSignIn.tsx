import {
  QueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { ApiPath } from '@/constants'
import { configApiOption, RequestClient } from '@/services/clients'

import { MutationOptions, ResponseDto } from '@/constants/types/api'
import { GetPostsResponse } from '@/constants/types/api/posts'
import { SignInRequest, SignInResponse } from '@/constants/types/api/auth'
import dayjs from 'dayjs'

const signIn = async (
  request: SignInRequest,
): Promise<ResponseDto<SignInResponse>> => {
  try {
    return await RequestClient.post(ApiPath.Auth.SIGN_IN, request)
  } catch (error) {
    console.error('[useSignIn] Unexpected error: ', error)

    throw error
  }
}

export const useSignIn = (mutationOptions: MutationOptions = {}) => {
  return useMutation({
    mutationKey: ['useSignIn', `${dayjs().unix()}`],
    mutationFn: async (request: SignInRequest) => signIn(request),
    ...configApiOption,
    ...mutationOptions,
  })
}
