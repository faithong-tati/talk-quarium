'use client'

import { useAuth, useDevice } from '@/contexts'
import { Box, IconButton, styled } from '@mui/material'
import React, { use, useEffect } from 'react'
import MoleculePostCard from '@/components/molecules/MoleculePostCard'
import { PostCardMode } from '@/constants/enums'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { redirect, useRouter } from 'next/navigation'
import OrganismCommentCards from '@/components/organisms/OrganismCommentCards'
import AtomButton from '@/components/atoms/AtomButton'
import { useGetPostById } from '@/services/api/posts'
import postsDecorator from '@/decorators/posts.decorator'
import { useGetCommentsByPostId } from '@/services/api/comments'
import commentsDecorator from '@/decorators/comments.decorator'
import { enqueueSnackbar } from 'notistack'
import FormCreateComment from '@/components/organisms/forms/FormCreateComment'
import { useDialog } from '@/contexts/dialog.context'

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
  const { isAuthenticated } = useAuth()
  const { setOpenDialogMustSignin } = useDialog()
  const router = useRouter()
  const { openDialogCreateComment, setOpenDialogCreateComment } = useDialog()
  const postId = resolvedParams.id

  // * ================================ API ================================
  const {
    data: getPostByIdResponse,
    isSuccess: isSuccessGetPostId,
    isLoading: isLoadingGetPostById,
  } = useGetPostById(postId)

  const {
    data: getCommentsByPostIdResponse,
    isSuccess: isSuccessGetCommentsByPostId,
    refetch: refetchGetCommentsByPostId,
  } = useGetCommentsByPostId({ params: { postId } })
  // * ================================ API ================================

  const formattedGetPostById = postsDecorator.getPostById(
    getPostByIdResponse?.data,
  )

  const formattedGetCommentsByPostId =
    commentsDecorator.getCommentsByPostIdResponse(
      getCommentsByPostIdResponse?.data,
    )

  if (!isLoadingGetPostById && !isSuccessGetPostId) {
    enqueueSnackbar('Post not found :(', { variant: 'error' })

    setTimeout(() => {
      redirect('/')
    }, 100)
  }

  useEffect(() => {
    if (!openDialogCreateComment) {
      refetchGetCommentsByPostId()
    }
  }, [openDialogCreateComment])

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'40px'}
      sx={{
        margin: isMobile ? '-16px' : '-32px',
        width: isMobile ? '100vw' : `calc(100vw - 248px)`,
        backgroundColor: 'var(--white)',
        padding: isMobile ? '24px 16px' : '36px 140px',
        height: isMobile ? 'calc(100vh - 72px)' : 'calc(100vh - 60px)',
      }}
    >
      <IconButton
        sx={{ width: '44px', height: '44px' }}
        onClick={() => router.back()}
      >
        <StyledBackIcon />
      </IconButton>

      <Box
        sx={{
          height: isMobile ? 'calc(100vh - 72px)' : 'calc(100vh - 60px)',
          overflowY: 'auto',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {isSuccessGetPostId && (
          <MoleculePostCard
            sx={{ padding: 0 }}
            mode={PostCardMode.FULL}
            {...formattedGetPostById}
          />
        )}

        <Box display={'flex'} flexDirection={'column'} gap={'24px'} mt={'40px'}>
          {(isMobile || !openDialogCreateComment) && (
            <AtomButton
              variant="outlined"
              onClick={() => {
                if (isAuthenticated) {
                  setOpenDialogCreateComment(true)

                  return
                }

                setOpenDialogMustSignin(true)
              }}
            >
              Add Comments
            </AtomButton>
          )}

          <FormCreateComment postId={postId} />

          {isSuccessGetCommentsByPostId && (
            <OrganismCommentCards commentCards={formattedGetCommentsByPostId} />
          )}
        </Box>
      </Box>
    </Box>
  )
}
