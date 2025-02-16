import { Button, ButtonProps, styled, SxProps } from '@mui/material'
import React from 'react'

const StyledButton = styled(Button)`
  border-radius: 8px;
  height: 40px;
  padding: 0 30px;
  text-transform: none;
  box-shadow: none;
`

export default function AtomButton(props: ButtonProps) {
  const { className, variant = 'contained', children, ...otherProps } = props
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
      sx={{ width: 'fit-content', ...sxProps() }}
      variant={variant}
      {...otherProps}
    >
      {children}
    </StyledButton>
  )
}
