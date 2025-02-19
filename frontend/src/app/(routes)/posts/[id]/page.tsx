'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, IconButton, styled } from '@mui/material'
import { redirect, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import React, { use, useEffect } from 'react'
import AtomButton from '@/components/atoms/AtomButton'
import AtomTypography from '@/components/atoms/AtomTypography'
import MoleculeDialog from '@/components/molecules/MoleculeDialog'
import MoleculePostCard from '@/components/molecules/MoleculePostCard'
import FormCreateComment from '@/components/organisms/forms/FormCreateComment'
import FormEditPost from '@/components/organisms/forms/FormEditPost'
import OrganismCommentCards from '@/components/organisms/OrganismCommentCards'
import { ButtonMode, PostCardMode } from '@/constants/enums'
import { useAuth, useDevice } from '@/contexts'
import { useDialog } from '@/contexts/dialog.context'
import commentsDecorator from '@/decorators/comments.decorator'
import postsDecorator from '@/decorators/posts.decorator'
import { useGetCommentsByPostId } from '@/services/api/comments'
import { useDeletePost, useGetPostById } from '@/services/api/posts'

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

export default function Page({ params }: PageProps) {
  const resolvedParams = use(params)
  const { isMobile } = useDevice()
  const { isAuthenticated } = useAuth()
  const {
    openDialogDeletePost,
    openDialogUpdatePost,
    setOpenDialogDeletePost,
    setOpenDialogMustSignin,
  } = useDialog()

  const router = useRouter()
  const {
    openDialogCreateComment,
    setOpenDialogCreateComment,
    setOpenDialogUpdatePost,
  } = useDialog()

  const postId = resolvedParams.id
  const { mutateAsync: deletePostApi } = useDeletePost({
    onSuccess: () => {
      enqueueSnackbar('Delete post successfully :)', { variant: 'success' })

      router.push('/')
    },
    onError: () => {
      enqueueSnackbar('Delete post failed :(', { variant: 'error' })
    },
  })

  const {
    data: getPostByIdResponse,
    isSuccess: isSuccessGetPostId,
    isLoading: isLoadingGetPostById,
    refetch: refetchGetPostById,
  } = useGetPostById(postId)

  const {
    data: getCommentsByPostIdResponse,
    isSuccess: isSuccessGetCommentsByPostId,
    refetch: refetchGetCommentsByPostId,
  } = useGetCommentsByPostId({ params: { postId } })

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
    if (!openDialogCreateComment || !openDialogUpdatePost) {
      refetchGetCommentsByPostId()
      refetchGetPostById()
    }
  }, [openDialogCreateComment, openDialogUpdatePost])

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
            onClickEditCard={() => setOpenDialogUpdatePost(true)}
            onClickDeleteCard={() => setOpenDialogDeletePost(true)}
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

      <FormEditPost
        defaultValues={postsDecorator.getPostById(getPostByIdResponse?.data)}
      />

      <MoleculeDialog
        open={openDialogDeletePost}
        onClickPrimaryButton={async () => {
          await deletePostApi(getPostByIdResponse?.data?.id || 0)

          setOpenDialogDeletePost(false)
        }}
        onClickSecondaryButton={() => setOpenDialogDeletePost(false)}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        title={`Please confirm if you wish\nto delete the post`}
        mode={ButtonMode.ERROR}
        enableCloseIcon={false}
        isSmall
      >
        <AtomTypography sx={{ textAlign: 'center' }} labelVariant="content-4">
          {`Are you sure you want to delete the post?\nOnce deleted, it cannot be recovered.`}
        </AtomTypography>
      </MoleculeDialog>
    </Box>
  )
}
