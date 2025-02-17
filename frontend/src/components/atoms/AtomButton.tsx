import { Button, ButtonProps, styled, SxProps } from '@mui/material'
import React from 'react'

interface AtomButtonProps extends ButtonProps {
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
    className,
    variant = 'contained',
    children,
    fullWidth = false,
    ...otherProps
  } = props
  const sxProps = (): SxProps<any> => {
    if (variant === 'contained') {
      return {
        backgroundColor: 'var(--success)',
      }
    }

    return {
      backgroundColor: 'none !important',
      borderColor: 'var(--success) !important',
      color: 'var(--success) !important',
    }
  }

  return (
    <StyledButton
      className={`button-1 ${className}`}
      sx={{
        width: fullWidth ? '100%' : 'fit-content',
        color: props.disabled ? 'var(--grey-300) !important' : '',
        ...sxProps(),
      }}
      variant={variant}
      {...otherProps}
    >
      {children}
    </StyledButton>
  )
}
