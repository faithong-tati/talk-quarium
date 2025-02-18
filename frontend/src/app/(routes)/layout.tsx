'use client'

import { Box, styled } from '@mui/material'
import { useDevice } from '@/contexts'
import MoleculeListItems from '@/components/molecules/MoleculeListItems'
import { DRAWER_WIDTH, MENU_ITEMS } from '@/constants'
import { DialogMode, Theme } from '@/constants/enums'
import OrganismAppBar from '@/components/organisms/OrganismAppBar'
import MoleculeDialog from '@/components/molecules/MoleculeDialog'
import { useDialog } from '@/contexts/dialog.context'
import AtomTypography from '@/components/atoms/AtomTypography'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const {
    openDialogUnsavedChange,
    setOpenDialogUnsavedChange,
    setOpenDialogCreatePost,
    openDialogMustSignIn,
    setOpenDialogMustSignin,
  } = useDialog()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MoleculeDialog
        mode={DialogMode.WARNING}
        open={openDialogUnsavedChange}
        onClickPrimaryButton={() => {
          setOpenDialogUnsavedChange(false)
          setOpenDialogCreatePost(false)
        }}
        onClickSecondaryButton={() => setOpenDialogUnsavedChange(false)}
        onCloseDialog={() => setOpenDialogUnsavedChange(false)}
        primaryButtonText="Ok"
        secondaryButtonText="Cancel"
        title="Unsaved Changes"
      >
        <AtomTypography labelVariant="content-4">
          You have unsaved changes that will be lost. Continue?
        </AtomTypography>
      </MoleculeDialog>

      <MoleculeDialog
        mode={DialogMode.WARNING}
        open={openDialogMustSignIn}
        onClickPrimaryButton={() => {
          setOpenDialogMustSignin(false)
          router.push('/sign-in')
        }}
        onClickSecondaryButton={() => setOpenDialogMustSignin(false)}
        onCloseDialog={() => setOpenDialogMustSignin(false)}
        primaryButtonText="Ok"
        secondaryButtonText="Cancel"
        title="Join us?"
      >
        <AtomTypography labelVariant="content-4">
          Sign-in to enjoy full access!
        </AtomTypography>
      </MoleculeDialog>

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
