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
import { ButtonMode } from '@/constants/enums'

interface MoleculeDialogProps extends DialogProps {
  children: ReactNode
  onClickPrimaryButton: () => void
  onClickSecondaryButton: () => void
  primaryButtonText: string
  secondaryButtonText: string
  disabledPrimaryButton?: boolean
  enableCloseIcon?: boolean
  mode?: ButtonMode
  onCloseDialog?: () => void
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
    enableCloseIcon = true,
    onClickPrimaryButton,
    onClickSecondaryButton,
    onCloseDialog,
    primaryButtonText,
    secondaryButtonText,
    open,
    title,
    mode = ButtonMode.SUCCESS,
  } = props

  const { isMobile } = useDevice()
  const buttonStyles = () => {
    return {
      secondary: {
        text: {
          color: `--text-default-description`,
        },
      },
      primary: {
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
      onClose={() => onCloseDialog?.()}
    >
      <DialogTitle>
        <AtomTypography color="--blue-gray-900" labelVariant="title-1">
          {title}
        </AtomTypography>
      </DialogTitle>

      {enableCloseIcon && (
        <CloseIcon
          onClick={() => onCloseDialog?.()}
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
      )}

      <DialogContent>{children}</DialogContent>

      <DialogActions
        sx={{
          display: 'flex',
          gap: isMobile ? '12px' : '10px',
          flexDirection: isMobile
            ? 'row'
            : [ButtonMode.SUCCESS, ButtonMode.WARNING].includes(mode)
              ? 'column'
              : 'column-reverse',
        }}
      >
        <AtomButton
          fullWidth
          variant="outlined"
          buttonMode={mode}
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
            ml: '0 !important',
          }}
          fullWidth
          type="submit"
          buttonMode={mode}
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
