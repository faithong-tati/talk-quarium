export interface ResponseDto<T = unknown> {
  errorCode: string
  successful: boolean
  message: string
  display?: string
  data?: T
  httpStatus?: number
}
