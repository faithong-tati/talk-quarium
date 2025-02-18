import { Box, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import { StorageKey } from '@/constants/enums'
import { deleteStorage } from '@/utils/helpers'
import AtomButton from '../atoms/AtomButton'
import AtomImage from '../atoms/AtomImage'
import AtomTypography from '../atoms/AtomTypography'

interface MoleculeUserInfoProps {
  isAuthenticated: boolean
  isLoading: boolean
  userImageUrl: string
  username: string
}

const StyledUserImage = styled(AtomImage)`
  border-radius: 100%;
`

export default function MoleculeUserInfo(props: MoleculeUserInfoProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading, userImageUrl, username } = props

  if (isLoading) {
    return <></>
  }

  if (isAuthenticated) {
    return (
      <Box display={'flex'} alignItems={'center'} gap={'20px'}>
        <Box>
          <AtomTypography color="--white" labelVariant="content-2">
            {username}
          </AtomTypography>
          <AtomTypography
            sx={{
              textDecoration: 'underline',
              cursor: 'pointer',
              textAlign: 'right',
            }}
            color="--white"
            labelVariant="content-1"
            onClick={async () => {
              deleteStorage(StorageKey.ACCESS_TOKEN)

              window.location.reload()
            }}
          >
            log out
          </AtomTypography>
        </Box>

        <StyledUserImage
          src={userImageUrl}
          alt="user image"
          width={40}
          height={40}
        />
      </Box>
    )
  }

  return (
    <AtomButton onClick={() => router.push('/sign-in')}>Sign In</AtomButton>
  )
}
