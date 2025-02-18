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
  openDialogDeletePost: boolean
  openDialogMustSignIn: boolean
  openDialogUnsavedChange: boolean
  setOpenDialogCreatePost: Dispatch<React.SetStateAction<boolean>>
  setOpenDialogDeletePost: Dispatch<React.SetStateAction<boolean>>
  setOpenDialogMustSignin: Dispatch<React.SetStateAction<boolean>>
  setOpenDialogUnsavedChange: Dispatch<React.SetStateAction<boolean>>
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [openDialogMustSignIn, setOpenDialogMustSignin] = useState(false)
  const [openDialogUnsavedChange, setOpenDialogUnsavedChange] = useState(false)
  const [openDialogCreatePost, setOpenDialogCreatePost] =
    useState<boolean>(false)

  const [openDialogDeletePost, setOpenDialogDeletePost] =
    useState<boolean>(false)

  return (
    <DialogContext.Provider
      value={{
        openDialogCreatePost,
        openDialogDeletePost,
        openDialogMustSignIn,
        openDialogUnsavedChange,
        setOpenDialogCreatePost,
        setOpenDialogDeletePost,
        setOpenDialogMustSignin,
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
