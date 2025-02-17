import { ResponseDto } from '../base.response'

export interface SignInResponse extends ResponseDto {
  accessToken: string
  userId: number
  username: string
}
