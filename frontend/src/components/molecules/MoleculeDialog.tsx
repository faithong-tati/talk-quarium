import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  styled,
} from '@mui/material'
import React, { ReactNode } from 'react'
import AtomButton from '../atoms/AtomButton'
import AtomTypography from '../atoms/AtomTypography'
import CloseIcon from '@mui/icons-material/Close'
import { useDevice } from '@/contexts'
import { DialogMode } from '@/constants/enums'

interface MoleculeDialogProps extends DialogProps {
  children: ReactNode
  onClickPrimaryButton: () => void
  onClickSecondaryButton: () => void
  onCloseDialog: () => void
  primaryButtonText: string
  secondaryButtonText: string
  disabledPrimaryButton?: boolean
  mode?: DialogMode
}

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 12px !important;
  }

  & .MuiDialogActions-root {
    margin: 0 24px 30px;
    padding: 0;
  }
`

export default function MoleculeDialog(props: MoleculeDialogProps) {
  const {
    children,
    disabledPrimaryButton = false,
    onClickPrimaryButton,
    onClickSecondaryButton,
    onCloseDialog,
    primaryButtonText,
    secondaryButtonText,
    open,
    title,
    mode = DialogMode.SUCCESS,
  } = props

  const { isMobile } = useDevice()
  const buttonStyles = () => {
    const dialogColorMode = {
      [DialogMode.SUCCESS]: '--success',
      [DialogMode.WARNING]: '--warning',
      [DialogMode.ERROR]: '--surface-default-default',
    }

    return {
      secondary: {
        button: {
          border: `1px solid var(${dialogColorMode[mode]}) !important`,
        },
        text: {
          color: `--text-default-description`,
        },
      },
      primary: {
        button: {
          backgroundColor: `var(${dialogColorMode[mode]})`,
        },
        text: {
          color: '--white',
        },
      },
    }
  }

  return (
    <StyledDialog
      sx={{
        '& .MuiDialog-paper': {
          minWidth: isMobile ? '350px' : '600px',
        },
      }}
      open={open}
      onClose={onCloseDialog}
    >
      <DialogTitle>
        <AtomTypography color="--blue-gray-900" labelVariant="title-1">
          {title}
        </AtomTypography>
      </DialogTitle>

      <CloseIcon
        onClick={onCloseDialog}
        sx={{
          width: '24px',
          height: '24px',
          position: 'absolute',
          right: 12,
          top: 12,
          color: 'var(--green-500)',
          cursor: 'pointer',
        }}
      />

      <DialogContent>{children}</DialogContent>

      <DialogActions
        sx={{
          display: 'flex',
          gap: isMobile ? '12px' : '10px',
          flexDirection: isMobile
            ? 'row'
            : [DialogMode.SUCCESS, DialogMode.WARNING].includes(mode)
              ? 'column'
              : 'column-reverse',
        }}
      >
        <AtomButton
          sx={{
            width: '100%',
            backgroundColor: 'var(--white) !important',
            border: buttonStyles().secondary.button.border,
          }}
          onClick={onClickSecondaryButton}
        >
          <AtomTypography
            color={buttonStyles().secondary.text.color}
            labelVariant="button-1"
          >
            {secondaryButtonText}
          </AtomTypography>
        </AtomButton>

        <AtomButton
          sx={{
            width: '100%',
            ml: '0 !important',
            backgroundColor: buttonStyles().primary.button.backgroundColor,
          }}
          type='submit'
          disabled={disabledPrimaryButton}
          onClick={onClickPrimaryButton}
        >
          <AtomTypography
            color={buttonStyles().primary.text.color}
            labelVariant="button-1"
          >
            {primaryButtonText}
          </AtomTypography>
        </AtomButton>
      </DialogActions>
    </StyledDialog>
  )
}
