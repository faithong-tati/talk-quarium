import { identity, pickBy } from 'lodash'
import { JwtResponse } from '@/constants/types/api/auth'
import { jwtDecode } from 'jwt-decode'

export const formatRequest = (request: object): string => {
  const cleanedRequest = pickBy(request, identity)

  return Object.entries(cleanedRequest).reduce((acc, [key, value], index) => {
    const encodedValue = encodeURIComponent(value)

    if (index === 0) {
      return `?${key}=${encodedValue}`
    }

    return `${acc}&${key}=${encodedValue}`
  }, '')
}

export const decodeJwt = (token: string): JwtResponse => {
  try {
    return jwtDecode<JwtResponse>(token)
  } catch (error) {
    console.error('[decodeJWT] Unexpected error: ', error)

    throw error
  }
}
