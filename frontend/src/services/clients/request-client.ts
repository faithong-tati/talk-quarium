import axios, { AxiosError, AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import { ApiPath, Environment } from '@/constants'
import { StorageKey } from '@/constants/enums'
import { decodeJwt, deleteStorage, getStorage } from '@/utils/helpers'
import { RequestClientConfig } from './query-client-config'

const configApiOption = {}
const RequestClient = axios.create({
  ...RequestClientConfig,
  baseURL: `${Environment.APP_TALK_QUARIUM_API_BASE_URL}`,
})

RequestClient.interceptors.request.use(async (config) => {
  const token = getStorage(StorageKey.ACCESS_TOKEN)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

RequestClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error) => {
    const originalRequest = error.config

    if (
      originalRequest.url === ApiPath.Auth.SIGN_IN &&
      error?.response?.status === 400
    ) {
      deleteStorage(StorageKey.ACCESS_TOKEN)
    }

    const accessToken = getStorage(StorageKey.ACCESS_TOKEN)

    if (accessToken) {
      const decodedToken = decodeJwt(`${accessToken}`)

      if (Number(decodedToken?.exp) <= dayjs().unix()) {
        originalRequest._retry = true
      }
    }

    const targetEnv = [Environment.APP_TALK_QUARIUM_API_BASE_URL]

    if (targetEnv?.filter((env) => env)?.length !== targetEnv.length) {
      throw new Error('The required environment variables are missing')
    }

    throw (error as AxiosError).response?.data
  },
)

export { RequestClient, configApiOption }
