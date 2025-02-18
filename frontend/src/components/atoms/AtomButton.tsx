import { Button, ButtonProps, SxProps, styled } from '@mui/material'
import React from 'react'
import { ButtonMode } from '@/constants/enums'

interface AtomButtonProps extends ButtonProps {
  buttonMode?: ButtonMode
  fullWidth?: boolean
}

const StyledButton = styled(Button)`
  border-radius: 8px;
  height: 40px;
  padding: 0 30px;
  text-transform: none;
  box-shadow: none;
`

export default function AtomButton(props: AtomButtonProps) {
  const {
    buttonMode = ButtonMode.SUCCESS,
    className,
    variant = 'contained',
    children,
    fullWidth = false,
    sx,
    ...otherProps
  } = props

  const sxProps = (): SxProps<any> => {
    const colorConfig = {
      [ButtonMode.SUCCESS]: '--success',
      [ButtonMode.WARNING]: '--warning',
      [ButtonMode.ERROR]: '--surface-critical-default',
    }

    if (variant === 'contained') {
      return {
        ...sx,
        width: fullWidth ? '100%' : 'fit-content',
        backgroundColor: `var(${colorConfig[buttonMode]})`,
      }
    }

    return {
      ...sx,
      color: `var(${colorConfig[buttonMode]})`,
      width: fullWidth ? '100%' : 'fit-content',
      backgroundColor: 'var(--white) !important',
      border:
        buttonMode === ButtonMode.SUCCESS
          ? `1px solid var(${colorConfig[buttonMode]}) !important`
          : '1px solid var(--surface-default-default)',
    }
  }

  return (
    <StyledButton
      className={`button-1 ${className}`}
      sx={sxProps()}
      variant={variant}
      {...otherProps}
    >
      {children}
    </StyledButton>
  )
}
