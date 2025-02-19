'use client'

import { Box, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'
import AtomButton from '@/components/atoms/AtomButton'
import AtomInput from '@/components/atoms/AtomInput'
import AtomTypography from '@/components/atoms/AtomTypography'
import { Regex } from '@/constants'
import { StorageKey } from '@/constants/enums'
import { useAuth, useDevice } from '@/contexts'
import { useSignIn } from '@/services/api/auth'
import { setDelay, setStorage } from '@/utils/helpers'

const StyledSignInBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
`

export default function FormSignIn() {
  const { isMobile } = useDevice()
  const { setAccessToken } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { mutateAsync: signInApi } = useSignIn()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true)
      e.preventDefault()
      await setDelay(1000)

      const response = await signInApi({ username })

      if (response.data?.accessToken) {
        setAccessToken(response.data.accessToken)
        setStorage(StorageKey.ACCESS_TOKEN, response.data.accessToken)
      }
    } catch (error) {
      console.error('[SignIn] Unexpected error: ', error)
      setAccessToken(null)
      enqueueSnackbar('Sign In failed :(', { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <StyledSignInBox
      sx={{
        p: isMobile ? '0 16px' : '0 200px',
        width: isMobile ? '100%' : '55%',
        height: isMobile ? '55%' : '100%',
      }}
    >
      <AtomTypography color="--white" labelVariant="title-1">
        Sign In
      </AtomTypography>

      <form onSubmit={handleSubmit}>
        <AtomInput
          sx={{
            mb: '20px',
            '& .MuiInputBase-root': {
              backgroundColor: 'var(--white)',
            },
          }}
          placeholder="Username"
          value={username}
          slotProps={{
            htmlInput: {
              maxLength: 32,
            },
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            const sanitizedValue = value.replace(Regex.USERNAME, '')

            setUsername(sanitizedValue)
          }}
        />
        <AtomButton
          loading={isLoading}
          type="submit"
          fullWidth
          disabled={!username}
        >
          Sign In
        </AtomButton>
      </form>

      <AtomTypography
        sx={{
          textAlign: 'center',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        color="--white"
        labelVariant="content-1"
        onClick={() => router.push('/')}
      >
        Continue as guest
      </AtomTypography>
    </StyledSignInBox>
  )
}
