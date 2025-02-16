import { Typography, TypographyProps } from '@mui/material'
import React from 'react'

interface AtomTypographyProps extends TypographyProps {
  labelVariant?: string
}

export default function AtomTypography(props: AtomTypographyProps) {
  const { className, labelVariant, children, ...otherProps } = props

  return (
    <Typography className={`${labelVariant} ${className}`} {...otherProps}>
      {children}
    </Typography>
  )
}
