'use client'

import { Box, styled } from '@mui/material'
import { useDevice } from '@/contexts'
import MoleculeListItems from '@/components/molecules/MoleculeListItems'
import { DRAWER_WIDTH, MENU_ITEMS } from '@/constants'
import { Theme } from '@/constants/enums'
import OrganismAppBar from '@/components/organisms/OrganismAppBar'

const StyledChildBox = styled(Box)`
  background: var(--grey-100) !important;
`

const StyledChildSmBox = styled(Box)`
  padding: 88px 16px 16px;
  height: 100%;
`

const StyledChildLgBox = styled(Box)`
  padding: 92px 0 32px 0;
  height: 100%;

  display: flex;
  gap: 40px;
`

const StyledSideBarBox = styled(Box)`
  min-width: ${DRAWER_WIDTH}px;
  max-width: ${DRAWER_WIDTH}px;
  position: fixed;

  display: flex;
  gap: 40px;
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isMobile } = useDevice()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <OrganismAppBar />

      <StyledChildBox>
        {isMobile ? (
          <StyledChildSmBox>{children}</StyledChildSmBox>
        ) : (
          <StyledChildLgBox>
            <StyledSideBarBox>
              <MoleculeListItems items={MENU_ITEMS} theme={Theme.DARK} />
            </StyledSideBarBox>

            <Box ml={`${DRAWER_WIDTH}px`}>{children}</Box>
          </StyledChildLgBox>
        )}
      </StyledChildBox>
    </Box>
  )
}
