'use client'

import { Box } from '@mui/material'
import React from 'react'
import FormSearchPosts from '@/components/organisms/forms/FormSearchPosts'
import { DRAWER_WIDTH } from '@/constants'
import { useDevice } from '@/contexts'

export default function Page() {
  const { isMobile } = useDevice()

  return (
    <Box
      sx={{
        width: isMobile ? undefined : `calc(100vw - ${DRAWER_WIDTH * 2}px)`,
      }}
    >
      <FormSearchPosts />
    </Box>
  )
}
