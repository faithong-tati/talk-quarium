import { SxProps } from '@mui/material'
import { SelectCommon } from './select-common'
import { InputType } from '../enums'

export interface FormField {
  name: string
  type: InputType

  label?: string
  options?: SelectCommon[]
  placeholder?: string
  sx?: SxProps
}

export interface FormGeneratorRef {
  submit: () => void
  reset: () => void
  isDirty: boolean
  values: any
}
