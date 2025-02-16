import { Drawer, DrawerProps, styled } from '@mui/material'
import React from 'react'

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    background: var(--green-500) !important;
  }
`

export default function MoleculeDrawer(props: DrawerProps) {
  const { anchor = 'right', children, ...otherProps } = props

  return (
    <StyledDrawer anchor={anchor} {...otherProps}>
      {children}
    </StyledDrawer>
  )
}
