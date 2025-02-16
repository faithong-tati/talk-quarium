import { Button, ButtonProps, styled } from '@mui/material'
import React from 'react'

const StyledButton = styled(Button)`
  background-color: var(--success);
  border-radius: 8px;
  height: 40px;
  padding: 0 30px;
  text-transform: none;
  box-shadow: none;
`

export default function AtomButton(props: ButtonProps) {
  const { variant = 'contained', children, ...otherProps } = props

  return (
    <StyledButton variant={variant} {...otherProps}>
      {children}
    </StyledButton>
  )
}
