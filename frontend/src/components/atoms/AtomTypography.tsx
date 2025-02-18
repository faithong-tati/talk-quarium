import { Typography, TypographyProps } from '@mui/material'
import React from 'react'

interface AtomTypographyProps extends TypographyProps {
  color?: string
  labelVariant?: string
}

export default function AtomTypography(props: AtomTypographyProps) {
  const {
    children,
    className,
    color = '--black',
    labelVariant,
    sx,
    ...otherProps
  } = props

  return (
    <Typography
      className={`${labelVariant} ${className}`}
      sx={{ color: `var(${color})`, whiteSpace: 'pre-wrap', ...sx }}
      {...otherProps}
    >
      {children}
    </Typography>
  )
}
