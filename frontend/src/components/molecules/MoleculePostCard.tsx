import { PostCardMode } from '@/constants/enums'
import { Box, styled, SxProps } from '@mui/material'
import React from 'react'
import AtomImage from '../atoms/AtomImage'
import AtomTypography from '../atoms/AtomTypography'
import AtomChip from '../atoms/AtomChip'
import { PostCardProps } from '@/constants/types/components'
import { formatIssuedDate } from '@/utils/helpers'

interface MoleculePostCardProps extends PostCardProps {
  sx?: SxProps
  mode?: PostCardMode
}

const StyledMainBox = styled(Box)`
  padding: 20px;
  background-color: var(--white);
  width: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
`

const StyledImage = styled(AtomImage)`
  border-radius: 100%;
`

export default function MoleculePostCard(props: MoleculePostCardProps) {
  const {
    author,
    commentsCount,
    content,
    imageUrl,
    mode = PostCardMode.FULL,
    sx,
    title,
    topic,
    updatedAt,
  } = props

  const isFullMode = mode === PostCardMode.FULL

  return (
    <StyledMainBox gap={isFullMode ? '16px' : '8px'} sx={{ ...sx }}>
      <Box display={'flex'} gap={'10px'} alignItems={'center'}>
        <StyledImage
          src={imageUrl}
          alt="author image"
          width={isFullMode ? 48 : 30}
          height={isFullMode ? 48 : 30}
        />
        <AtomTypography
          color={isFullMode ? '--text' : '--grey-300'}
          labelVariant="content-4"
        >
          {author}
        </AtomTypography>
        {isFullMode && (
          <AtomTypography color="--grey-300" labelVariant="content-1">
            {formatIssuedDate(updatedAt)}
          </AtomTypography>
        )}
      </Box>

      <AtomChip sx={{ width: 'fit-content', height: '24px' }} label={topic} />

      <AtomTypography
        color="--blue-gray-900"
        labelVariant={isFullMode ? 'title-1' : 'title-2'}
      >
        {title}
      </AtomTypography>
      <AtomTypography
        sx={{
          display: '-webkit-box',
          WebkitLineClamp: isFullMode ? undefined : 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
        color={isFullMode ? '--text' : '--blue-gray-900'}
        labelVariant="content-1"
      >
        {content}
      </AtomTypography>

      <Box display={'flex'} alignItems={'center'} gap={'5px'}>
        <AtomImage
          src="/icons/comment.svg"
          alt="comment icon"
          width={12}
          height={12}
        />
        <AtomTypography color="--grey-300" labelVariant="content-1">
          {commentsCount} Comments
        </AtomTypography>
      </Box>
    </StyledMainBox>
  )
}
