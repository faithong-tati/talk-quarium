import { Box, styled } from '@mui/material'
import React from 'react'
import { CommentCardProps } from '@/constants/types/components/CommentCardProps'
import { formatIssuedDate } from '@/utils/helpers'
import AtomImage from '../atoms/AtomImage'
import AtomTypography from '../atoms/AtomTypography'

const StyledImage = styled(AtomImage)`
  border-radius: 100%;
`

export default function MoleculeCommentCard(props: CommentCardProps) {
  const { author, content, createdAt, userImageUrl } = props

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
      <Box display={'flex'} alignItems={'center'} gap={'10px'}>
        <StyledImage
          src={userImageUrl}
          alt="author image"
          width={40}
          height={40}
        />
        <AtomTypography color="--text" labelVariant="content-4">
          {author}
        </AtomTypography>
        <AtomTypography
          sx={{ paddingTop: '4px' }}
          color="--grey-300"
          labelVariant="content-1"
        >
          {formatIssuedDate(createdAt)}
        </AtomTypography>
      </Box>

      <AtomTypography
        sx={{ ml: '50px' }}
        color="--text"
        labelVariant="content-1"
      >
        {content}
      </AtomTypography>
    </Box>
  )
}
