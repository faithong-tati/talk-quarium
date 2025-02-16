import { Chip, ChipProps, styled } from '@mui/material'
import React from 'react'

interface AtomChipProps extends ChipProps {
  labelVariant?: string
}

const StyledChip = styled(Chip)`
  padding: 4px;
  background-color: var(--surface-default-hovered) !important;
  color: var(--text-brand-grey) !important;
`

export default function AtomChip(props: AtomChipProps) {
  const { className, labelVariant = 'content-1', ...otherProps } = props

  return <StyledChip className={`${labelVariant} ${className}`} {...props} />
}
