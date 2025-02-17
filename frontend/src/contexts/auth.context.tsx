'use client'

import { StorageKey } from '@/constants/enums'
import { decodeJwt, deleteStorage, getStorage } from '@/utils/helpers'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface AuthContextType {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = getStorage(StorageKey.ACCESS_TOKEN)

    if (token) {
      try {
        const decodedToken = decodeJwt(token)
        const currentTime = dayjs().unix()

        if (decodedToken.exp < currentTime) {
          deleteStorage(StorageKey.ACCESS_TOKEN)
          setAccessToken(null)
          router.push('/sign-in')
        } else {
          setAccessToken(token)
        }
      } catch (error) {
        setAccessToken(null)

        router.push('/sign-in')
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Warning! useAuth() must be used within a AuthProvider')
  }
  return context
}
