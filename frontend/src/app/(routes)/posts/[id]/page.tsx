'use client'

import { useDevice } from '@/contexts'
import { Box, IconButton, styled } from '@mui/material'
import React, { use } from 'react'
import MoleculePostCard from '@/components/molecules/MoleculePostCard'
import { PostCardMode } from '@/constants/enums'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import OrganismCommentCards from '@/components/organisms/OrganismCommentCards'
import AtomButton from '@/components/atoms/AtomButton'
import { useGetPostById } from '@/services/api/posts'
import postsDecorator from '@/decorators/posts.decorator'

interface PageProps {
  params: Promise<{ id: number }>
}

const StyledBackIcon = styled(ArrowBackIcon)`
  background-color: var(--green-100);
  color: var(--green-500);
  border-radius: 100%;
  width: 44px;
  height: 44px;
  padding: 12px;
`

export default function page({ params }: PageProps) {
  const resolvedParams = use(params)
  const { isMobile } = useDevice()
  const router = useRouter()
  const postId = resolvedParams.id

  // * ================================ API ================================
  const { data: getPostByIdResponse, isSuccess: isSuccessGetPostId } =
    useGetPostById(postId)
  // * ================================ API ================================

  const formattedGetPostById = postsDecorator.getPostById(
    getPostByIdResponse?.data,
  )

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

      {isSuccessGetPostId && (
        <MoleculePostCard
          sx={{ padding: 0 }}
          mode={PostCardMode.FULL}
          {...formattedGetPostById}
        />
      )}

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
