'use client'

import AtomInput from '@/components/atoms/AtomInput'
import { Box, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import AtomSelect from '@/components/atoms/AtomSelect'
import OrganismPostCards from '../OrganismPostCards'
import { PostCardMode, Topic } from '@/constants/enums'
import { TOPIC_OPTIONS } from '@/constants'
import AtomButton from '@/components/atoms/AtomButton'
import AddIcon from '@mui/icons-material/Add'
import { useDevice } from '@/contexts'
import { PostCardProps } from '@/constants/types/components'
import { usePathname } from 'next/navigation'

export default function FormSearchPosts() {
  const { isMobile } = useDevice()
  const pathname = usePathname()
  const [searchText, setSearchText] = useState<string>('')
  const [focusSearchText, setFocusSearchText] = useState<boolean>(false)
  const [selectValue, setSelectValue] = useState<number | string>('')
  const leftComponentDisplayCondition = () => {
    if (!isMobile) {
      return true
    }

    return focusSearchText
  }

  const rightComponentDisplayCondition = () => {
    if (!isMobile) {
      return true
    }

    return !focusSearchText
  }

  const postCards: PostCardProps[] = [
    {
      id: 1,
      author: 'faithong',
      commentsCount: 8,
      content:
        'hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hehello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello llo hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello ',
      title: 'random title',
      topic: Topic.EXERCISE,
      imageUrl: 'https://media.tenor.com/HmFcGkSu58QAAAAM/silly.gif',
      updatedAt: new Date(),
    },
    {
      id: 2,
      author: 'faithong',
      commentsCount: 8,
      content:
        'hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hehello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello llo hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello ',
      title: 'random title',
      topic: Topic.EXERCISE,
      imageUrl: 'https://media.tenor.com/HmFcGkSu58QAAAAM/silly.gif',
      updatedAt: new Date(),
    },
  ]

  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={1} mb={'24px'}>
        {isMobile && !focusSearchText && (
          <Box sx={{ mr: 'auto' }} onClick={() => setFocusSearchText(true)}>
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
            slotProps={{
              input: {
                value: searchText,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchText(e.target.value),
                onBlur: (_: any) => !searchText && setFocusSearchText(false),
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
          <AtomSelect
            sx={{ mt: 2, width: '40%', height: '40px' }}
            placeholder="Community"
            options={TOPIC_OPTIONS}
            value={selectValue}
            onChange={(e: any) => setSelectValue(e.target.value)}
          />
        )}

        {rightComponentDisplayCondition() && (
          <AtomButton endIcon={<AddIcon />}>Create</AtomButton>
        )}
      </Box>

      <OrganismPostCards postCards={postCards} mode={PostCardMode.PREVIEW} />
    </>
  )
}
