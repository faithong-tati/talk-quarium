import { Topic } from './enums'
import { SelectCommon } from './types'

export const TOPIC_OPTIONS: SelectCommon[] = Object.values(Topic).map((data) => {
  return {
    label: data,
    value: data,
  }
})
