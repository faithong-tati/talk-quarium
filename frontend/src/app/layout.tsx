'use client'

import '../styles/globals.css'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { AuthProvider, DeviceProvider } from '@/contexts'
import { DialogProvider } from '@/contexts/dialog.context'
import theme from '@/lib/theme'
import { QueryClientConfig } from '@/services/clients'

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
                <DialogProvider>
                  <SnackbarProvider
                    maxSnack={3}
                    autoHideDuration={3000}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    {children}
                  </SnackbarProvider>
                </DialogProvider>
              </DeviceProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
