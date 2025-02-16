'use client'

import { useDevice } from '@/contexts'
import { Box, IconButton, styled } from '@mui/material'
import React from 'react'
import MoleculePostCard from '@/components/molecules/MoleculePostCard'
import { PostCardMode, Topic } from '@/constants/enums'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import OrganismCommentCards from '@/components/organisms/OrganismCommentCards'
import AtomButton from '@/components/atoms/AtomButton'

const StyledBackIcon = styled(ArrowBackIcon)`
  background-color: var(--green-100);
  color: var(--green-500);
  border-radius: 100%;
  width: 44px;
  height: 44px;
  padding: 12px;
`

export default function page() {
  const { isMobile } = useDevice()
  const router = useRouter()

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'40px'}
      sx={{
        margin: isMobile ? '-16px' : '-32px',
        width: '100vw',
        backgroundColor: 'var(--white)',
        padding: isMobile ? '24px 16px' : '36px 140px',
        height: '100%',
      }}
    >
      <IconButton
        sx={{ width: '44px', height: '44px' }}
        onClick={() => router.back()}
      >
        <StyledBackIcon />
      </IconButton>

      <MoleculePostCard
        sx={{ padding: 0 }}
        id={1}
        author={'faithong'}
        commentsCount={1}
        content={
          'hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello '
        }
        title={'i love cats'}
        topic={Topic.EXERCISE}
        imageUrl={'https://media.tenor.com/HmFcGkSu58QAAAAM/silly.gif'}
        updatedAt={new Date()}
        mode={PostCardMode.FULL}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'24px'}>
        <AtomButton variant="outlined">Add Comments</AtomButton>

        <OrganismCommentCards
          commentCards={[
            {
              id: 1,
              author: 'faithong',
              content:
                'hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello ',
              createdAt: new Date(),
              imageUrl: '',
            },
            {
              id: 2,
              author: 'faithong',
              content: 'aa',
              createdAt: new Date(),
              imageUrl: '',
            },
          ]}
        />
      </Box>
    </Box>
  )
}
