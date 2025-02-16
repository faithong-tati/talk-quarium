'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useTheme, useMediaQuery } from '@mui/material'

export interface DeviceContextType {
  isMobile: boolean
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined)

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <DeviceContext.Provider value={{ isMobile }}>
      {children}
    </DeviceContext.Provider>
  )
}

export const useDevice = (): DeviceContextType => {
  const context = useContext(DeviceContext)

  if (!context) {
    throw new Error('Warning! useDevice() must be used within a DeviceProvider')
  }

  return context
}
