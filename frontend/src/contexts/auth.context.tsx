'use client'

import dayjs from 'dayjs'
import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { StorageKey } from '@/constants/enums'
import { decodeJwt, deleteStorage, getStorage } from '@/utils/helpers'

interface AuthContextType {
  accessToken: string | null
  isAuthenticated: boolean
  setAccessToken: Dispatch<React.SetStateAction<string | null>>
  setIsAuthenticated: Dispatch<React.SetStateAction<boolean>>
  setUserId: Dispatch<React.SetStateAction<number>>
  userId: number
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userId, setUserId] = useState<number>(0)

  useEffect(() => {
    const token = getStorage(StorageKey.ACCESS_TOKEN)

    if (token) {
      try {
        const decodedToken = decodeJwt(token)
        const currentTime = dayjs().unix()

        if (decodedToken.exp < currentTime) {
          deleteStorage(StorageKey.ACCESS_TOKEN)
          setAccessToken(null)
          window.location.reload()
        } else {
          setAccessToken(token)
        }
      } catch (error) {
        console.error('[AuthProvider] Unexpected error: ', error)

        setAccessToken(null)
      }
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        setAccessToken,
        setIsAuthenticated,
        setUserId,
        userId,
      }}
    >
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
