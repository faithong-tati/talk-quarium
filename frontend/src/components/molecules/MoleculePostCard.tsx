import { Box, SxProps, styled } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { PostCardMode } from '@/constants/enums'
import { PostCardProps } from '@/constants/types/components'
import { useAuth } from '@/contexts'
import { formatIssuedDate } from '@/utils/helpers'
import AtomChip from '../atoms/AtomChip'
import AtomImage from '../atoms/AtomImage'
import AtomTypography from '../atoms/AtomTypography'

interface MoleculePostCardProps extends PostCardProps {
  mode?: PostCardMode
  onClickDeleteCard?: () => void
  onClickEditCard?: () => void
  sx?: SxProps
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
    id,
    author,
    commentsCount,
    content,
    mode = PostCardMode.FULL,
    sx,
    title,
    topic,
    updatedAt,
    userId,
    userImageUrl,
    onClickDeleteCard,
    onClickEditCard,
  } = props

  const router = useRouter()
  const pathname = usePathname()
  const { userId: authUserId } = useAuth()
  const isOwner = userId === authUserId
  const editMode = isOwner || pathname === '/our-blog'
  const isFullMode = mode === PostCardMode.FULL

  return (
    <StyledMainBox gap={isFullMode ? '16px' : '8px'} sx={{ ...sx }}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box display={'flex'} gap={'10px'} alignItems={'center'}>
          <StyledImage
            src={userImageUrl}
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
            <AtomTypography
              sx={{ paddingTop: '4px' }}
              color="--grey-300"
              labelVariant="content-1"
            >
              {formatIssuedDate(updatedAt)}
            </AtomTypography>
          )}
        </Box>

        {editMode && (
          <Box display={'flex'} gap={'15px'} sx={{ cursor: 'pointer' }}>
            <Box onClick={onClickEditCard}>
              <AtomImage
                src="/icons/edit.svg"
                alt="edit icon"
                width={16}
                height={16}
              />
            </Box>

            <Box onClick={onClickDeleteCard}>
              <AtomImage
                src="/icons/trash.svg"
                alt="trash icon"
                width={16}
                height={16}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={isFullMode ? '16px' : '8px'}
        onClick={() => router.push(`/posts/${id}`)}
      >
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
      </Box>
    </StyledMainBox>
  )
}
