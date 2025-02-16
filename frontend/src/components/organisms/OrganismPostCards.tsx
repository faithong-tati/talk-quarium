import { PostCardProps } from '@/constants/types/components'
import { Box, Divider } from '@mui/material'
import React from 'react'
import MoleculePostCard from '../molecules/MoleculePostCard'
import { PostCardMode } from '@/constants/enums'
import { useRouter } from 'next/navigation'

interface OrganismPostCardsProps {
  postCards: PostCardProps[]
  mode?: PostCardMode
}

export default function OrganismPostCards(props: OrganismPostCardsProps) {
  const { postCards, mode = PostCardMode.FULL } = props
  const router = useRouter()

  return (
    <>
      {postCards.map((card, index) => {
        const isFirst = index === 0
        const isLast = index === postCards.length - 1

        return (
          <Box
            sx={{ cursor: 'pointer' }}
            key={index}
            onClick={() => router.push(`/posts/${card.id}`)}
          >
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
              imageUrl={card.imageUrl}
              updatedAt={card.updatedAt}
              mode={mode}
            />

            {index !== postCards.length - 1 && <Divider />}
          </Box>
        )
      })}
    </>
  )
}
