import { PostCardProps } from '@/constants/types/components'
import { Box, Divider } from '@mui/material'
import React, { useState } from 'react'
import MoleculePostCard from '../molecules/MoleculePostCard'
import { ButtonMode, PostCardMode } from '@/constants/enums'
import MoleculeEmptyStateCard from '../molecules/MoleculeEmptyStateCard'
import MoleculeDialog from '../molecules/MoleculeDialog'
import AtomTypography from '../atoms/AtomTypography'
import { useDeletePost } from '@/services/api/posts'
import { enqueueSnackbar } from 'notistack'
import { useDialog } from '@/contexts/dialog.context'
import FormEditPost from './forms/FormEditPost'

interface OrganismPostCardsProps {
  postCards: PostCardProps[]
  mode?: PostCardMode
}

export default function OrganismPostCards(props: OrganismPostCardsProps) {
  const { postCards, mode = PostCardMode.FULL } = props
  const {
    openDialogDeletePost,
    setOpenDialogDeletePost,
    setOpenDialogUpdatePost,
  } = useDialog()

  const [selectedCardId, setSelectedCardId] = useState<number | null>(null)
  const { mutateAsync: deletePostApi } = useDeletePost({
    onSuccess: () => {
      enqueueSnackbar('Delete post successfully :)', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Delete post failed :(', { variant: 'error' })
    },
  })

  if (postCards.length === 0) {
    return (
      <MoleculeEmptyStateCard text1="No posts yet." text2="Be the first!" />
    )
  }

  return (
    <>
      {postCards.map((card, index) => {
        const isFirst = index === 0
        const isLast = index === postCards.length - 1

        return (
          <Box sx={{ cursor: 'pointer' }} key={index}>
            <MoleculePostCard
              sx={{
                ...(isFirst && {
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                }),
                ...(isLast && {
                  borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px',
                }),
              }}
              id={card.id}
              author={card.author}
              commentsCount={card.commentsCount}
              content={card.content}
              title={card.title}
              topic={card.topic}
              userImageUrl={card.userImageUrl}
              updatedAt={card.updatedAt}
              mode={mode}
              onClickEditCard={() => {
                setSelectedCardId(card.id)
                setOpenDialogUpdatePost(true)
              }}
              onClickDeleteCard={() => {
                setSelectedCardId(card.id)
                setOpenDialogDeletePost(true)
              }}
            />
            {index !== postCards.length - 1 && <Divider />}

            <FormEditPost id={selectedCardId || 0} />

            <MoleculeDialog
              open={openDialogDeletePost}
              onClickPrimaryButton={async () => {
                await deletePostApi(selectedCardId || 0)

                setOpenDialogDeletePost(false)
              }}
              onClickSecondaryButton={() => setOpenDialogDeletePost(false)}
              primaryButtonText="Delete"
              secondaryButtonText="Cancel"
              title={`Please confirm if you wish to delete the post`}
              mode={ButtonMode.ERROR}
              enableCloseIcon={false}
            >
              <AtomTypography>
                Are you sure you want to delete the post? Once deleted, it
                cannot be recovered.
              </AtomTypography>
            </MoleculeDialog>
          </Box>
        )
      })}
    </>
  )
}
