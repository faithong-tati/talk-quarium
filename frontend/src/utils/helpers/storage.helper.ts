import { StorageKey } from '@/constants/enums'

export const deleteStorage = (name: StorageKey): void => {
  delete localStorage[name]
}

export const setStorage = (name: StorageKey, payload: string): void => {
  localStorage[name] = payload
}

export const getStorage = (name: StorageKey): string | null => {
  return localStorage[name] || null
}
