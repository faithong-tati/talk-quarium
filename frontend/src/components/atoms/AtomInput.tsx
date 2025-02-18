import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import {
  InputAdornment,
  TextField,
  TextFieldProps,
  styled,
} from '@mui/material'
import React from 'react'

export const StyledTextField = styled(TextField)`
  width: 100%;

  & .MuiOutlinedInput-root {
    border-radius: 8px;
    background-color: transparent;
    height: 44px;
  }

  & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: var(--success) !important;
  }

  input {
    height: 0;
  }
`

export default function AtomInput(props: TextFieldProps) {
  return (
    <StyledTextField
      variant="outlined"
      slotProps={{
        input: {
          ...(props.type === 'search' && {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon sx={{ height: '20px', width: '20px' }} />
              </InputAdornment>
            ),
          }),
          ...props.slotProps?.input,
        },
      }}
      {...props}
    />
  )
}
