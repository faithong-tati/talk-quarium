import { CommentCardProps } from '@/constants/types/components/CommentCardProps'
import { Box } from '@mui/material'
import React from 'react'
import MoleculeCommentCard from '../molecules/MoleculeCommentCard'
import MoleculeEmptyStateCard from '../molecules/MoleculeEmptyStateCard'

interface OrganismCommentCardsProps {
  commentCards: CommentCardProps[]
}

export default function OrganismCommentCards(props: OrganismCommentCardsProps) {
  const { commentCards } = props

  if (commentCards.length === 0) {
    return <MoleculeEmptyStateCard text1="No comments yet." />
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'24px'}>
      {commentCards?.map((card, index) => {
        return (
          <MoleculeCommentCard
            key={index}
            id={card.id}
            author={card.author}
            content={card.content}
            createdAt={card.createdAt}
            imageUrl={card.imageUrl}
          />
        )
      })}
    </Box>
  )
}
