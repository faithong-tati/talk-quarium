import { Box } from '@mui/material'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { Controller, useForm } from 'react-hook-form'
import AtomAutocomplete from '@/components/atoms/AtomAutocomplete'
import AtomInput from '@/components/atoms/AtomInput'
import { InputType } from '@/constants/enums'
import { FormField, FormGeneratorRef } from '@/constants/types'

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
        onValuesChange?.(values)
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
                      <AtomAutocomplete
                        {...controllerField}
                        placeholder={field.placeholder || ''}
                        options={field.options || []}
                        sx={field.sx}
                        onChange={(_event, newValue) =>
                          controllerField.onChange(newValue)
                        }
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

FormGenerator.displayName = 'FormGenerator'

export default FormGenerator
