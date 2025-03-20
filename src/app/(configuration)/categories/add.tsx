'use client'

import { useTransition } from 'react'
import { Button, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { FaSave as SaveIcon } from 'react-icons/fa'

import { addCategory } from '@actions/categories'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'
import { TCategory } from '@types'

const AddCategory = () => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, reset } = useForm<Partial<TCategory>>({
    initialValues: {
      name: '',
      remarks: ''
    }
  })

  const submitHandler = (formData: Partial<TCategory>) =>
    startTransition(async () => {
      const res = await addCategory(formData)
      showNotification(getMessage(res))

      if (res.status === StatusMsg.SUCCESS) {
        reset()
        closeAllModals()
      }
    })

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <TextInput label="Category Name" placeholder="Enter category name" {...getInputProps('name')} mb="xs" required />

      <Textarea
        label="Remarks"
        placeholder="Any additional details (if any)"
        rows={4}
        mb="sm"
        {...getInputProps('remarks')}
      />

      <Button type="submit" leftSection={<SaveIcon />} loading={isLoading}>
        Save
      </Button>
    </form>
  )
}

export default AddCategory
