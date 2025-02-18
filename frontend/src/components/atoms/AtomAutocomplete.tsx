import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { SxProps } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import React, { useState } from 'react'
import { StyledTextField } from './AtomInput'
import { SelectCommon } from '@/constants/types'

interface AtomAutocompleteProps {
  options: SelectCommon[]
  placeholder?: string
  onChange?: (event: React.SyntheticEvent, value: string | number) => void
  sx?: SxProps
  value?: string | number
}

export default function AtomAutocomplete(props: AtomAutocompleteProps) {
  const { onChange, options, placeholder = 'Select option', sx, value } = props
  const [internalValue, setInternalValue] = useState<string | number>('')
  const currentValue = value !== undefined ? value : internalValue
  const valueOption =
    options.find((option) => option.value === currentValue) || null

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    if (onChange) {
      onChange(event, newValue?.value || '')
    } else {
      setInternalValue(newValue?.value || '')
    }
  }

  return (
    <Autocomplete
      disablePortal
      getOptionLabel={(option: SelectCommon) => option.label}
      onChange={handleChange}
      options={options}
      popupIcon={<KeyboardArrowDownIcon />}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          sx={{ '& .MuiInputBase-root': { height: '40px' } }}
          placeholder={placeholder}
        />
      )}
      value={valueOption}
      sx={{ ...sx, marginTop: '0' }}
      isOptionEqualToValue={(option: SelectCommon, valueParam: any) =>
        typeof valueParam === 'object'
          ? option.value === valueParam.value
          : option.value === valueParam
      }
    />
  )
}
