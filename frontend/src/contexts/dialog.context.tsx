'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
} from 'react'

interface DialogContextType {
  openDialogCreatePost: boolean
  openDialogUnsavedChange: boolean
  setOpenDialogCreatePost: Dispatch<React.SetStateAction<boolean>>
  setOpenDialogUnsavedChange: Dispatch<React.SetStateAction<boolean>>
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [openDialogUnsavedChange, setOpenDialogUnsavedChange] = useState(false)
  const [openDialogCreatePost, setOpenDialogCreatePost] =
    useState<boolean>(false)

  return (
    <DialogContext.Provider
      value={{
        openDialogCreatePost,
        setOpenDialogCreatePost,
        openDialogUnsavedChange,
        setOpenDialogUnsavedChange,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error('Warning! useDialog() must be used within a DialogProvider')
  }

  return context
}
