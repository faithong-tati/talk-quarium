import { PostCardProps } from '@/constants/types/components'
import { Box, Divider } from '@mui/material'
import React from 'react'
import MoleculePostCard from '../molecules/MoleculePostCard'
import { Topic } from '@mui/icons-material'

interface OrganismPostCardsProps {
  postCards: PostCardProps[]
}

export default function OrganismPostCards(props: OrganismPostCardsProps) {
  // call api here

  return (
    <>
      {props.postCards.map((card, index) => {
        const isFirst = index === 0
        const isLast = index === props.postCards.length - 1

        return (
          <React.Fragment key={index}>
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
              author={card.author}
              commentsCount={card.commentsCount}
              content={card.content}
              title={card.title}
              topic={card.topic}
              imageUrl={card.imageUrl}
            />

            {index !== props.postCards.length - 1 && <Divider />}
          </React.Fragment>
        )
      })}
    </>
  )
}
