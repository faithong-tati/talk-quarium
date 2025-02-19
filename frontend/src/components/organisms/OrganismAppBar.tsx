import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Toolbar, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { DRAWER_WIDTH, MENU_ITEMS } from '@/constants'
import { StorageKey } from '@/constants/enums'
import { DeviceContextType, useAuth, useDevice } from '@/contexts'
import { useGetUser } from '@/services/api/users'
import { deleteStorage } from '@/utils/helpers'
import AtomTypography from '../atoms/AtomTypography'
import MoleculeDrawer from '../molecules/MoleculeDrawer'
import MoleculeListItems from '../molecules/MoleculeListItems'
import MoleculeUserInfo from '../molecules/MoleculeUserInfo'

const StyledToolbar = styled(Toolbar)`
  background-color: var(--green-500);
`

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<DeviceContextType>(({ isMobile }) => ({
  height: isMobile ? '72px' : '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}))

const StyledMenuIcon = styled(MenuIcon)`
  width: 24px;
  height: 24px;
  margin: 0 8px;
`

const StyledBackIconBox = styled(Box)`
  color: var(--green-100);
  width: 82px;
  height: 24px;
  padding-left: 33px;
`

const StyledDrawerBox = styled(Box)`
  width: ${DRAWER_WIDTH}px;
  height: 100%;
  padding: 32px 0;

  display: flex;
  flex-direction: column;
  gap: 36px;
`

export default function OrganismAppBar() {
  const { isMobile } = useDevice()
  const router = useRouter()
  const { accessToken, isAuthenticated, setIsAuthenticated, setUserId } =
    useAuth()

  const [open, setOpen] = useState<boolean>(false)
  const toggleDrawer = (newOpen: boolean) => (): void => {
    setOpen(newOpen)
  }

  const {
    data: getUserResponse,
    isLoading: isLoadingGetUser,
    isSuccess: isSuccessGetUser,
    isError: isErrorGetUSer,
  } = useGetUser(!!accessToken)

  useEffect(() => {
    setIsAuthenticated(isSuccessGetUser)

    if (isErrorGetUSer) {
      deleteStorage(StorageKey.ACCESS_TOKEN)
      deleteStorage(StorageKey.PRE_SIGN_IN_PATH)
    } else {
      setUserId(getUserResponse?.data?.userId || 0)
    }
  }, [isSuccessGetUser, isErrorGetUSer])

  return (
    <AppBar>
      <StyledToolbar>
        <StyledBox isMobile={isMobile}>
          <AtomTypography
            sx={{ cursor: 'pointer' }}
            color="--white"
            labelVariant="brand-2"
            onClick={() => router.push('/')}
          >
            TalkQuarium
          </AtomTypography>

          {isMobile ? (
            <>
              <StyledMenuIcon
                sx={{ cursor: 'pointer' }}
                onClick={toggleDrawer(true)}
              />

              <MoleculeDrawer open={open} onClose={toggleDrawer(false)}>
                <StyledDrawerBox>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    marginRight={'33px'}
                  >
                    <StyledBackIconBox onClick={toggleDrawer(false)}>
                      <ArrowForwardIcon sx={{ cursor: 'pointer' }} />
                    </StyledBackIconBox>
                    <MoleculeUserInfo
                      isAuthenticated={isAuthenticated}
                      isLoading={isLoadingGetUser}
                      username={getUserResponse?.data?.username || ''}
                      userImageUrl={getUserResponse?.data?.userImageUrl || ''}
                    />
                  </Box>

                  <MoleculeListItems
                    items={MENU_ITEMS}
                    onClick={toggleDrawer(false)}
                  />
                </StyledDrawerBox>
              </MoleculeDrawer>
            </>
          ) : (
            <MoleculeUserInfo
              isAuthenticated={isAuthenticated}
              isLoading={isLoadingGetUser}
              username={getUserResponse?.data?.username || ''}
              userImageUrl={getUserResponse?.data?.userImageUrl || ''}
            />
          )}
        </StyledBox>
      </StyledToolbar>
    </AppBar>
  )
}
