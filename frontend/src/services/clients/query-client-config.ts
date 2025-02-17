import { QueryClient } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'

export const QueryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      networkMode: 'always',
    },
    mutations: {
      networkMode: 'always',
    },
  },
})

export const RequestClientConfig: AxiosRequestConfig = {
  timeout: 60000,
}
