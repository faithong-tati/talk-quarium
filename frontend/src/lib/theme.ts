import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 1100,
      md: 1200,
      lg: 1300,
      xl: 1536,
    },
  },
})

export default theme
