export interface ResponseDto<T = unknown> {
  errorCode: string
  successful: boolean
  message: string
  display?: string
  data?: T
  httpStatus?: number
}

export interface BaseResponse {
  id: number
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string
}
