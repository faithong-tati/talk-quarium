import { useSnackbar } from 'notistack'
import React, { useEffect, useRef, useState } from 'react'
import MoleculeDialog from '@/components/molecules/MoleculeDialog'
import FormGenerator from '@/components/organisms/forms/FormGenerator'
import { TOPIC_OPTIONS } from '@/constants'
import { InputType, Topic } from '@/constants/enums'
import { FormField, FormGeneratorRef } from '@/constants/types'
import { useDevice } from '@/contexts'
import { useDialog } from '@/contexts/dialog.context'
import { useCreatePost } from '@/services/api/posts'

export default function FormCreatePost() {
  const { isMobile } = useDevice()
  const { enqueueSnackbar } = useSnackbar()
  const {
    openDialogCreatePost,
    setOpenDialogCreatePost,
    setOpenDialogUnsavedChange,
  } = useDialog()

  const formRef = useRef<FormGeneratorRef>(null)
  const [formValues, setFormValues] = useState({
    topic: '',
    title: '',
    content: '',
  })

  const { mutateAsync: createPostApi } = useCreatePost({
    onSuccess: () => {
      enqueueSnackbar('Create post successfully :)', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Create post failed :(', { variant: 'error' })
    },
  })

  const formFields: FormField[] = [
    {
      name: 'topic',
      type: InputType.SELECT,
      placeholder: 'Community',
      options: TOPIC_OPTIONS,
      sx: { mt: 2, width: isMobile ? '100%' : '30%', height: '40px' },
    },
    {
      name: 'title',
      type: InputType.INPUT,
      placeholder: 'Title',
      sx: { '& .MuiInputBase-root': { height: '40px' } },
    },
    {
      name: 'content',
      type: InputType.TEXTAREA,
      placeholder: "What's on your mind...",
      sx: { '& .MuiInputBase-root': { height: 'fit-content' }, rows: 7 },
    },
  ]

  const defaultValues = {
    topic: '',
    title: '',
    content: '',
  }

  const onSubmit = async (data: any) => {
    const { content, title, topic } = data

    await createPostApi({
      content,
      title,
      topic: topic as Topic,
    })

    setOpenDialogCreatePost(false)
  }

  const onCloseDialog = () => {
    if (formRef.current?.isDirty) {
      setOpenDialogUnsavedChange(true)

      return
    }

    setOpenDialogCreatePost(false)
  }

  useEffect(() => {
    if (!openDialogCreatePost && formRef.current) {
      formRef.current.reset()
      setFormValues(defaultValues)
    }
  }, [openDialogCreatePost])

  const disablePrimary = !(
    formValues.topic &&
    formValues.title &&
    formValues.content
  )

  return (
    <MoleculeDialog
      open={openDialogCreatePost}
      onClickPrimaryButton={() => {
        formRef.current?.submit()
      }}
      onClickSecondaryButton={onCloseDialog}
      onCloseDialog={onCloseDialog}
      primaryButtonText="Post"
      secondaryButtonText="Cancel"
      title="Create Post"
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
  )
}
