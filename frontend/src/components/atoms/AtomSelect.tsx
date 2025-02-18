import { BaseSelectProps, MenuItem, Select, styled } from '@mui/material'
import React from 'react'
import { SelectCommon } from '@/constants/types'
import AtomTypography from './AtomTypography'

interface AtomSelectProps extends BaseSelectProps {
  placeholder: string
  options: SelectCommon[]
}

const StyledSelect = styled(Select)`
  height: 44px;
  border-radius: 8px;
  width: 100%;
  margin-top: 0 !important;
`

export default function AtomSelect(props: AtomSelectProps) {
  const { placeholder = '', options, value, ...otherProps } = props

  return (
    <StyledSelect
      value={value}
      displayEmpty
      renderValue={
        value !== ''
          ? undefined
          : () => <AtomTypography>{placeholder}</AtomTypography>
      }
      {...otherProps}
    >
      {options.map((option, index) => {
        return (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        )
      })}
    </StyledSelect>
  )
}
