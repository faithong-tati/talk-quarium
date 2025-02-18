'use client'

import { Box, styled } from '@mui/material'
import { redirect } from 'next/navigation'
import React from 'react'
import AtomImage from '@/components/atoms/AtomImage'
import AtomTypography from '@/components/atoms/AtomTypography'
import FormSignIn from '@/components/organisms/forms/FormSignIn'
import { StorageKey } from '@/constants/enums'
import { useAuth, useDevice } from '@/contexts'
import { useGetUser } from '@/services/api/users'
import { getStorage } from '@/utils/helpers'

const StyledBrandBox = styled(Box)`
  background-color: var(--green-300);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`

export default function Page() {
  const { isMobile } = useDevice()
  const { accessToken } = useAuth()
  const { isSuccess: isSuccessGetUser } = useGetUser(!!accessToken)

  if (isSuccessGetUser) {
    const preSignInPath = getStorage(StorageKey.PRE_SIGN_IN_PATH)

    redirect(preSignInPath || '/')
  }

  return (
    <Box
      sx={{ backgroundColor: 'var(--green-500)' }}
      display={'flex'}
      flexDirection={isMobile ? 'column-reverse' : 'row'}
      height={'100vh'}
    >
      <FormSignIn />

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
