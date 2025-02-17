import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box } from '@mui/material'
import AtomInput from '@/components/atoms/AtomInput'
import AtomSelect from '@/components/atoms/AtomSelect'
import { FormField, FormGeneratorRef } from '@/constants/types'
import { InputType } from '@/constants/enums'

interface FormGeneratorProps {
  fields: FormField[]
  defaultValues: any
  onSubmit: (data: any) => void
  onValuesChange?: (values: any) => void
}

const FormGenerator = forwardRef<FormGeneratorRef, FormGeneratorProps>(
  ({ fields, defaultValues, onSubmit, onValuesChange }, ref) => {
    const {
      control,
      handleSubmit,
      reset,
      watch,
      formState: { isDirty },
    } = useForm({
      defaultValues,
    })

    const values = watch()
    const prevValuesRef = useRef(values)

    useEffect(() => {
      const { topic, title, content } = values
      const prevValues = prevValuesRef.current
      if (
        topic !== prevValues.topic ||
        title !== prevValues.title ||
        content !== prevValues.content
      ) {
        prevValuesRef.current = values
        onValuesChange && onValuesChange(values)
      }
    }, [values, onValuesChange])

    useImperativeHandle(
      ref,
      () => ({
        submit: handleSubmit(onSubmit),
        reset: () => reset(defaultValues),
        isDirty,
        values,
      }),
      [handleSubmit, onSubmit, reset, isDirty, values, defaultValues],
    )

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap="14px">
          {fields.map((field) => {
            switch (field.type) {
              case InputType.SELECT:
                return (
                  <Controller
                    key={field.name}
                    name={field.name}
                    control={control}
                    render={({ field: controllerField }) => (
                      <AtomSelect
                        {...controllerField}
                        placeholder={field.placeholder || ''}
                        options={field.options || []}
                        sx={field.sx}
                      />
                    )}
                  />
                )
              case InputType.TEXTAREA:
                return (
                  <Controller
                    key={field.name}
                    name={field.name}
                    control={control}
                    render={({ field: controllerField }) => (
                      <AtomInput
                        {...controllerField}
                        placeholder={field.placeholder}
                        multiline
                        rows={4}
                        sx={field.sx}
                      />
                    )}
                  />
                )
              case InputType.INPUT:
              default:
                return (
                  <Controller
                    key={field.name}
                    name={field.name}
                    control={control}
                    render={({ field: controllerField }) => (
                      <AtomInput
                        {...controllerField}
                        placeholder={field.placeholder}
                        sx={field.sx}
                      />
                    )}
                  />
                )
            }
          })}
        </Box>
      </form>
    )
  },
)

export default FormGenerator
