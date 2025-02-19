import { useSnackbar } from 'notistack'
import React, { useRef, useState } from 'react'
import MoleculeDialog from '@/components/molecules/MoleculeDialog'
import FormGenerator from '@/components/organisms/forms/FormGenerator'
import { TOPIC_OPTIONS } from '@/constants'
import { InputType, Topic } from '@/constants/enums'
import { FormField, FormGeneratorRef } from '@/constants/types'
import { PostCardProps } from '@/constants/types/components'
import { useDevice } from '@/contexts'
import { useDialog } from '@/contexts/dialog.context'
import { useGetPostById, useUpdatePost } from '@/services/api/posts'

interface FormEditPostProps {
  defaultValues: PostCardProps
}

export default function FormEditPost({ defaultValues }: FormEditPostProps) {
  const { isMobile } = useDevice()
  const { enqueueSnackbar } = useSnackbar()
  const {
    openDialogUpdatePost,
    setOpenDialogUpdatePost,
    setOpenDialogUnsavedChange,
  } = useDialog()

  const formRef = useRef<FormGeneratorRef>(null)
  const [formValues, setFormValues] = useState<PostCardProps>(defaultValues)
  const { isSuccess: isSuccessGetPostId } = useGetPostById(defaultValues?.id)
  const { mutateAsync: updatePostApi } = useUpdatePost({
    onSuccess: () => {
      enqueueSnackbar('Update post successfully :)', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Update post failed :(', { variant: 'error' })
    },
  })

  const formFields: FormField[] = [
    {
      name: 'topic',
      type: InputType.SELECT,
      placeholder: 'Choose a community',
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
      placeholder: `What's on your mind...`,
      sx: { '& .MuiInputBase-root': { height: 'fit-content' }, rows: 7 },
    },
  ]

  const $defaultValues = {
    topic: defaultValues?.topic as Topic,
    title: defaultValues?.title || '',
    content: defaultValues?.content || '',
  }

  const onSubmit = async (data: any) => {
    const { content, title, topic } = data

    await updatePostApi({
      query: { id: defaultValues.id },
      body: {
        content,
        title,
        topic: topic as Topic,
      },
    })

    setOpenDialogUpdatePost(false)
  }

  const onCloseDialog = () => {
    if (formRef.current?.isDirty) {
      setOpenDialogUnsavedChange(true)

      return
    }

    setOpenDialogUpdatePost(false)
  }

  const disablePrimary = !(
    formValues?.topic &&
    formValues?.title &&
    formValues?.content
  )

  return (
    <MoleculeDialog
      open={openDialogUpdatePost}
      onClickPrimaryButton={() => {
        formRef.current?.submit()
      }}
      onClickSecondaryButton={onCloseDialog}
      onCloseDialog={onCloseDialog}
      primaryButtonText="Confirm"
      secondaryButtonText="Cancel"
      title="Edit Post"
      disabledPrimaryButton={disablePrimary}
    >
      {isSuccessGetPostId && (
        <FormGenerator
          ref={formRef}
          fields={formFields}
          defaultValues={$defaultValues}
          onSubmit={onSubmit}
          onValuesChange={setFormValues}
        />
      )}
    </MoleculeDialog>
  )
}
