'use client'

import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react'

interface DialogContextType {
  openDialogCreateComment: boolean
  openDialogCreatePost: boolean
  openDialogDeletePost: boolean
  openDialogMustSignIn: boolean
  openDialogUnsavedChange: boolean
  openDialogUpdatePost: boolean
  setOpenDialogCreateComment: Dispatch<React.SetStateAction<boolean>>
  setOpenDialogCreatePost: Dispatch<React.SetStateAction<boolean>>
  setOpenDialogDeletePost: Dispatch<React.SetStateAction<boolean>>
  setOpenDialogMustSignin: Dispatch<React.SetStateAction<boolean>>
  setOpenDialogUnsavedChange: Dispatch<React.SetStateAction<boolean>>
  setOpenDialogUpdatePost: Dispatch<React.SetStateAction<boolean>>
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [openDialogMustSignIn, setOpenDialogMustSignin] = useState(false)
  const [openDialogUnsavedChange, setOpenDialogUnsavedChange] = useState(false)
  const [openDialogCreatePost, setOpenDialogCreatePost] =
    useState<boolean>(false)

  const [openDialogDeletePost, setOpenDialogDeletePost] =
    useState<boolean>(false)

  const [openDialogUpdatePost, setOpenDialogUpdatePost] =
    useState<boolean>(false)

  const [openDialogCreateComment, setOpenDialogCreateComment] =
    useState<boolean>(false)

  return (
    <DialogContext.Provider
      value={{
        openDialogCreateComment,
        openDialogCreatePost,
        openDialogDeletePost,
        openDialogMustSignIn,
        openDialogUnsavedChange,
        openDialogUpdatePost,
        setOpenDialogCreateComment,
        setOpenDialogCreatePost,
        setOpenDialogDeletePost,
        setOpenDialogMustSignin,
        setOpenDialogUnsavedChange,
        setOpenDialogUpdatePost,
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
