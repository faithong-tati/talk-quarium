'use client'

import AddIcon from '@mui/icons-material/Add'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Box, InputAdornment } from '@mui/material'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AtomAutocomplete from '@/components/atoms/AtomAutocomplete'
import AtomButton from '@/components/atoms/AtomButton'
import AtomInput from '@/components/atoms/AtomInput'
import { TOPIC_OPTIONS } from '@/constants'
import { PostCardMode, Topic } from '@/constants/enums'
import { useAuth, useDevice } from '@/contexts'
import { useDialog } from '@/contexts/dialog.context'
import postsDecorator from '@/decorators/posts.decorator'
import { useGetPublicPosts } from '@/services/api/posts'
import OrganismPostCards from '../OrganismPostCards'
import FormCreatePost from './FormCreatePost'

export default function FormSearchPosts() {
  const { isMobile } = useDevice()
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const {
    setOpenDialogCreatePost,
    setOpenDialogMustSignin,
    openDialogCreatePost,
    openDialogDeletePost,
    openDialogUpdatePost,
  } = useDialog()

  const [title, setTitle] = useState<string>('')
  const [focusTitle, setFocusTitle] = useState<boolean>(false)
  const [topic, setTopic] = useState<number | string>('')
  const leftComponentDisplayCondition = () => {
    if (!isMobile) {
      return true
    }

    return focusTitle
  }

  const rightComponentDisplayCondition = () => {
    if (!isMobile) {
      return true
    }

    return !focusTitle
  }

  const {
    data: getPublicPostsResponse,
    isSuccess: isSuccessGetPublicPosts,
    refetch: refetchGetPublicPosts,
  } = useGetPublicPosts({
    title,
    topic: topic as Topic,
    mode: pathname === '/our-blog' && isAuthenticated ? 'private' : 'public',
  })

  useEffect(() => {
    if (
      !openDialogCreatePost ||
      !openDialogDeletePost ||
      !openDialogUpdatePost
    ) {
      refetchGetPublicPosts()
    }
  }, [openDialogCreatePost, openDialogDeletePost, openDialogUpdatePost])

  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={1} mb={'24px'}>
        {isMobile && !focusTitle && (
          <Box sx={{ mr: 'auto' }} onClick={() => setFocusTitle(true)}>
            <SearchOutlinedIcon
              sx={{ height: '20px', width: '20px', color: 'var(--text)' }}
            />
          </Box>
        )}

        {leftComponentDisplayCondition() && (
          <AtomInput
            sx={{ '& .MuiInputBase-root': { height: '40px' } }}
            autoFocus={isMobile}
            placeholder="Search"
            type="search"
            slotProps={{
              input: {
                value: title,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value),
                onBlur: (_: any) => !title && setFocusTitle(false),
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon
                      sx={{ height: '20px', width: '20px' }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}

        {rightComponentDisplayCondition() && (
          <AtomAutocomplete
            sx={{ mt: 2, width: '40%', height: '40px' }}
            placeholder="Community"
            options={TOPIC_OPTIONS}
            value={topic}
            onChange={(_event, newValue) => setTopic(newValue)}
          />
        )}

        {rightComponentDisplayCondition() && (
          <AtomButton
            onClick={() => {
              if (isAuthenticated) {
                setOpenDialogCreatePost(true)

                return
              }

              setOpenDialogMustSignin(true)
            }}
            endIcon={<AddIcon />}
          >
            Create
          </AtomButton>
        )}
      </Box>

      {isSuccessGetPublicPosts && (
        <Box
          sx={{
            height: isMobile ? 'calc(100vh - 168px)' : 'calc(100vh - 188px)',
            overflowY: 'auto',
            borderRadius: '8px',
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <OrganismPostCards
            postCards={postsDecorator.getPostsResponse(
              getPublicPostsResponse?.data,
            )}
            mode={PostCardMode.PREVIEW}
          />
        </Box>
      )}

      <FormCreatePost />
    </>
  )
}
