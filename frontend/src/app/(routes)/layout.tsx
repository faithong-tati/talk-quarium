'use client'

import { AppBar, Box, styled, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { DeviceContextType, useDevice } from '@/contexts'
import AtomButton from '@/components/atoms/AtomButton'
import MoleculeDrawer from '@/components/molecules/MoleculeDrawer'
import { useState } from 'react'
import AtomTypography from '@/components/atoms/AtomTypography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import MoleculeListItems from '@/components/molecules/MoleculeListItems'
import { DRAWER_WIDTH, MENU_ITEMS } from '@/constants'
import { Theme } from '@/constants/enums'

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

const StyledDrawerBox = styled(Box)`
  width: ${DRAWER_WIDTH}px;
  height: 100%;
  padding: 32px 0;

  display: flex;
  flex-direction: column;
  gap: 36px;
`

const StyledBackIconBox = styled(Box)`
  color: var(--green-100);
  width: 82px;
  height: 24px;
  padding-left: 33px;
`

const StyledChildBox = styled(Box)`
  background: var(--grey-100) !important;
`

const StyledChildSmBox = styled(Box)`
  padding: 16px;
  height: 100vh;
`

const StyledChildLgBox = styled(Box)`
  padding: 32px 0;
  height: 100vh;

  display: flex;
  gap: 40px;
`

const StyledSideBarBox = styled(Box)`
  min-width: ${DRAWER_WIDTH}px;
  max-width: ${DRAWER_WIDTH}px;

  display: flex;
  gap: 40px;
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isMobile } = useDevice()
  const [open, setOpen] = useState<boolean>(false)
  const toggleDrawer = (newOpen: boolean) => (): void => {
    setOpen(newOpen)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
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
                    <StyledBackIconBox onClick={toggleDrawer(false)}>
                      <ArrowForwardIcon />
                    </StyledBackIconBox>
                    <MoleculeListItems items={MENU_ITEMS} />
                  </StyledDrawerBox>
                </MoleculeDrawer>
              </>
            ) : (
              <AtomButton>Sign In</AtomButton>
            )}
          </StyledBox>
        </StyledToolbar>

        <StyledChildBox>
          {isMobile ? (
            <StyledChildSmBox>{children}</StyledChildSmBox>
          ) : (
            <StyledChildLgBox>
              <StyledSideBarBox>
                <MoleculeListItems items={MENU_ITEMS} theme={Theme.DARK} />
              </StyledSideBarBox>

              {children}
            </StyledChildLgBox>
          )}
        </StyledChildBox>
      </AppBar>
    </Box>
  )
}
