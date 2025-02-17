import {
  InputAdornment,
  styled,
  TextField,
  TextFieldProps,
} from '@mui/material'
import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

const StyledTextField = styled(TextField)`
  width: 100%;

  & .MuiInputBase-root {
    border-radius: 8px;
    background-color: transparent;
    height: 44px;
  }

  input {
    height: 0;
  }
`

export default function AtomInput(props: TextFieldProps) {
  return (
    <StyledTextField
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
