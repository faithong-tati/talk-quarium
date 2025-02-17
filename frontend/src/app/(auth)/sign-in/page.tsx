'use client'

import AtomButton from '@/components/atoms/AtomButton'
import AtomImage from '@/components/atoms/AtomImage'
import AtomInput from '@/components/atoms/AtomInput'
import AtomTypography from '@/components/atoms/AtomTypography'
import { Regex } from '@/constants'
import { useDevice } from '@/contexts'
import { Box, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const StyledSignInBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
`

const StyledBrandBox = styled(Box)`
  background-color: var(--green-300);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`

export default function page() {
  const { isMobile } = useDevice()
  const router = useRouter()
  const [username, setUsername] = useState<string>('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Signing in with username:', username)
  }

  return (
    <Box
      sx={{ backgroundColor: 'var(--green-500)' }}
      display={'flex'}
      flexDirection={isMobile ? 'column-reverse' : 'row'}
      height={'100vh'}
    >
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
          <AtomButton type="submit" fullWidth disabled={!username}>
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
          onClick={() => router.push('/home')}
        >
          Continue as guest
        </AtomTypography>
      </StyledSignInBox>

      <StyledBrandBox
        sx={{
          borderRadius: isMobile ? '0 0 36px 36px' : '36px 0 0 36px',
          width: isMobile ? '100%' : '45%',
          height: isMobile ? '50%' : '100%',
        }}
      >
        <AtomImage
          src="/images/brand-image.png"
          alt="brand image"
          width={isMobile ? 170 : 300}
          height={isMobile ? 130 : 230}
          priority
        />
        <AtomTypography
          color="--white"
          labelVariant={isMobile ? 'brand-3' : 'brand-3'}
        >
          TalkQuarium
        </AtomTypography>
      </StyledBrandBox>
    </Box>
  )
}
