'use client'

import '../styles/globals.css'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import React from 'react'
import theme from '@/lib/theme'
import { DeviceProvider } from '@/contexts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DeviceProvider>{children}</DeviceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
