import React, { useEffect, useRef, useState } from 'react'
import { useDialog } from '@/contexts/dialog.context'
import { useDevice } from '@/contexts'
import MoleculeDialog from '@/components/molecules/MoleculeDialog'
import { TOPIC_OPTIONS } from '@/constants'
import { FormField, FormGeneratorRef } from '@/constants/types'
import FormGenerator from '@/components/organisms/forms/FormGenerator'
import { InputType, Topic } from '@/constants/enums'
import { useGetPostById, useUpdatePost } from '@/services/api/posts'
import { useSnackbar } from 'notistack'

interface FormEditPostProps {
  id: number
}

export default function FormEditPost({ id }: FormEditPostProps) {
  const { isMobile } = useDevice()
  const { enqueueSnackbar } = useSnackbar()
  const {
    openDialogUpdatePost,
    setOpenDialogUpdatePost,
    setOpenDialogUnsavedChange,
  } = useDialog()

  const formRef = useRef<FormGeneratorRef>(null)
  const [formValues, setFormValues] = useState({
    topic: '',
    title: '',
    content: '',
  })

  const {
    data: getPostByIdResponse,
    isSuccess: isSuccessGetPostId,
    isLoading: isLoadingGetPostById,
  } = useGetPostById(id)

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
    topic: getPostByIdResponse?.data?.topic as Topic,
    title: getPostByIdResponse?.data?.title || '',
    content: getPostByIdResponse?.data?.content || '',
  }

  const onSubmit = async (data: any) => {
    const { content, title, topic } = data

    await updatePostApi({
      query: { id },
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

  useEffect(() => {
    if (
      !isLoadingGetPostById &&
      isSuccessGetPostId &&
      getPostByIdResponse?.data
    ) {
      setFormValues({
        content: getPostByIdResponse.data.content,
        title: getPostByIdResponse.data.title,
        topic: getPostByIdResponse.data.topic,
      })
    }
  }, [isLoadingGetPostById, isSuccessGetPostId, getPostByIdResponse])

  const disablePrimary = !(
    formValues.topic &&
    formValues.title &&
    formValues.content
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
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          onValuesChange={setFormValues}
        />
      )}
    </MoleculeDialog>
  )
}
