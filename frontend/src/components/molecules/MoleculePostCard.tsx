import { Topic } from '@/constants/enums'
import { Box, styled, SxProps } from '@mui/material'
import React from 'react'
import AtomImage from '../atoms/AtomImage'
import AtomTypography from '../atoms/AtomTypography'
import AtomChip from '../atoms/AtomChip'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { PostCardProps } from '@/constants/types/components'

interface MoleculePostCardProps extends PostCardProps {
  sx?: SxProps
}

const StyledMainBox = styled(Box)`
  padding: 20px;
  background-color: var(--white);
  width: 100%;
`

const StyledImage = styled(AtomImage)`
  border-radius: 100%;
`

export default function MoleculePostCard(props: MoleculePostCardProps) {
  const { author, commentsCount, content, imageUrl, sx, title, topic } = props

  return (
    <StyledMainBox sx={{ ...sx, padding: '20px' }}>
      <Box display={'flex'} gap={'10px'} alignItems={'center'}>
        <StyledImage src={imageUrl} width={30} height={30} />
        <AtomTypography
          sx={{ color: 'var(--grey-300)' }}
          labelVariant="content-4"
        >
          {author}
        </AtomTypography>
      </Box>

      <AtomChip sx={{ mt: '15px' }} label={topic} />

      <AtomTypography
        sx={{ color: 'var(--blue-gray-900)', mt: '5px' }}
        labelVariant="title-2"
      >
        {title}
      </AtomTypography>
      <AtomTypography
        sx={{
          color: 'var(--blue-gray-900)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
        labelVariant="content-1"
      >
        {content}
      </AtomTypography>

      <Box display={'flex'} alignItems={'center'} mt={'5px'} gap={'5px'}>
        <ChatBubbleOutlineIcon
          sx={{ color: 'var(--grey-300)', width: '12px', height: '12px' }}
        />
        <AtomTypography
          sx={{
            color: 'var(--grey-300)',
          }}
          labelVariant="content-1"
        >
          {commentsCount} Comments
        </AtomTypography>
      </Box>
    </StyledMainBox>
  )
}
