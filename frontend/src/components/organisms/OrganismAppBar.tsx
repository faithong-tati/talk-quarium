import { DeviceContextType, useAuth, useDevice } from '@/contexts'
import { AppBar, Box, styled, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import AtomTypography from '../atoms/AtomTypography'
import MenuIcon from '@mui/icons-material/Menu'
import MoleculeDrawer from '../molecules/MoleculeDrawer'
import { DRAWER_WIDTH, MENU_ITEMS } from '@/constants'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import MoleculeListItems from '../molecules/MoleculeListItems'
import { useGetUser } from '@/services/api/users'
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
  const { accessToken } = useAuth()
  const [open, setOpen] = useState<boolean>(false)
  const toggleDrawer = (newOpen: boolean) => (): void => {
    setOpen(newOpen)
  }

  const { data: getUserResponse, isLoading: isLoadingGetUser } =
    useGetUser(!!accessToken)

  return (
    <AppBar>
      <StyledToolbar>
        <StyledBox isMobile={isMobile}>
          <AtomTypography color="--white" labelVariant="brand-2">
            TalkQuarium
          </AtomTypography>

          {isMobile ? (
            <>
              <StyledMenuIcon onClick={toggleDrawer(true)} />

              <MoleculeDrawer open={open} onClose={toggleDrawer(false)}>
                <StyledDrawerBox>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    marginRight={'33px'}
                  >
                    <StyledBackIconBox onClick={toggleDrawer(false)}>
                      <ArrowForwardIcon />
                    </StyledBackIconBox>
                    <MoleculeUserInfo
                      isAuthenticated={!!getUserResponse?.data}
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
              isAuthenticated={!!getUserResponse?.data}
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
