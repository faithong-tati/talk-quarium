'use client'

import { useDevice } from '@/contexts'
import { Box } from '@mui/material'
import React from 'react'
import { DRAWER_WIDTH } from '@/constants'
import FormSearchPosts from '@/components/organisms/forms/FormSearchPosts'

export default function page() {
  const { isMobile } = useDevice()

  return (
    <Box
      sx={{
        width: isMobile
          ? undefined
          : `calc(100vw - ${DRAWER_WIDTH * 2 + 80}px)`,
      }}
    >
      <FormSearchPosts />
    </Box>
  )
}
