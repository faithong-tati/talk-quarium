import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { ApiPath } from '@/constants'
import { MutationOptions, ResponseDto } from '@/constants/types/api'
import { SignInRequest, SignInResponse } from '@/constants/types/api/auth'
import { RequestClient, configApiOption } from '@/services/clients'

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
