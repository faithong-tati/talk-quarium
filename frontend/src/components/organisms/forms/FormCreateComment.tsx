import { Box } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect, useRef, useState } from 'react'
import AtomButton from '@/components/atoms/AtomButton'
import MoleculeDialog from '@/components/molecules/MoleculeDialog'
import FormGenerator from '@/components/organisms/forms/FormGenerator'
import { InputType } from '@/constants/enums'
import { FormField, FormGeneratorRef } from '@/constants/types'
import { useDevice } from '@/contexts'
import { useDialog } from '@/contexts/dialog.context'
import { useCreateComment } from '@/services/api/comments'

interface FormCreateCommentProps {
  postId: number
}

export default function FormCreateComment({ postId }: FormCreateCommentProps) {
  const { isMobile } = useDevice()
  const { enqueueSnackbar } = useSnackbar()
  const {
    openDialogCreateComment,
    setOpenDialogCreateComment,
    setOpenDialogUnsavedChange,
  } = useDialog()

  const formRef = useRef<FormGeneratorRef>(null)
  const [formValues, setFormValues] = useState({
    content: '',
  })

  const { mutateAsync: createCommentApi } = useCreateComment({
    onSuccess: () => {
      enqueueSnackbar('Create comment successfully :)', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Create comment failed :(', { variant: 'error' })
    },
  })

  const formFields: FormField[] = [
    {
      name: 'content',
      type: InputType.TEXTAREA,
      placeholder: `What's on your mind...`,
      sx: { '& .MuiInputBase-root': { height: 'fit-content' }, rows: 7 },
    },
  ]

  const defaultValues = {
    content: '',
  }

  const onSubmit = async (data: any) => {
    const { content } = data

    await createCommentApi({ body: { content }, params: { postId } })

    setOpenDialogCreateComment(false)
  }

  const onCloseDialog = () => {
    if (formRef.current?.isDirty) {
      setOpenDialogUnsavedChange(true)

      return
    }

    setOpenDialogCreateComment(false)
  }

  useEffect(() => {
    if (!openDialogCreateComment && formRef.current) {
      formRef.current.reset()
      setFormValues(defaultValues)
    }
  }, [openDialogCreateComment])

  const disablePrimary = !formValues.content

  return (
    <>
      {isMobile ? (
        <MoleculeDialog
          open={openDialogCreateComment}
          onClickPrimaryButton={() => {
            formRef.current?.submit()
          }}
          onClickSecondaryButton={onCloseDialog}
          onCloseDialog={onCloseDialog}
          primaryButtonText="Post"
          secondaryButtonText="Cancel"
          title="Add Comments"
          disabledPrimaryButton={disablePrimary}
        >
          <FormGenerator
            ref={formRef}
            fields={formFields}
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            onValuesChange={setFormValues}
          />
        </MoleculeDialog>
      ) : (
        <>
          {openDialogCreateComment && (
            <>
              <FormGenerator
                ref={formRef}
                fields={formFields}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                onValuesChange={setFormValues}
              />
              <Box
                display={'flex'}
                width={'40%'}
                gap={'12px'}
                justifyContent={'end'}
                ml={'auto'}
              >
                <AtomButton
                  fullWidth
                  variant="outlined"
                  onClick={() => setOpenDialogCreateComment(false)}
                >
                  Cancel
                </AtomButton>
                <AtomButton fullWidth onClick={() => console.log('post!')}>
                  Post
                </AtomButton>
              </Box>
            </>
          )}
        </>
      )}
    </>
  )
}
