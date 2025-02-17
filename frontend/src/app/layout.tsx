'use client'

import '../styles/globals.css'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import React from 'react'
import theme from '@/lib/theme'
import { AuthProvider, DeviceProvider } from '@/contexts'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClientConfig } from '@/services/clients'
import { DialogProvider } from '@/contexts/dialog.context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={QueryClientConfig}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <DeviceProvider>
                <DialogProvider>{children}</DialogProvider>
              </DeviceProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
