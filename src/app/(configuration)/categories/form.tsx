'use client'

import { useTransition } from 'react'
import { Button, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { FaSave as SaveIcon } from 'react-icons/fa'
import { MdUpdate as UpdateIcon } from 'react-icons/md'

import { addCategory, updateCategory } from '@actions/categories'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'
import { TCategory } from '@types'

type Props = {
  initialValues?: Partial<TCategory>
  categoryId?: number
}

const CategoryForm = ({ initialValues, categoryId }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, reset } = useForm<Partial<TCategory>>({
    initialValues: {
      name: '',
      description: '',
      ...initialValues
    }
  })

  const submitHandler = (formData: Partial<TCategory>) =>
    startTransition(async () => {
      const res = categoryId ? await updateCategory(categoryId, formData) : await addCategory(formData)

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
        label="Description"
        placeholder="Any additional details (if any)"
        rows={4}
        mb="sm"
        {...getInputProps('description')}
      />

      <Button type="submit" leftSection={categoryId ? <UpdateIcon /> : <SaveIcon />} loading={isLoading}>
        {categoryId ? 'Update' : 'Save'}
      </Button>
    </form>
  )
}

export default CategoryForm
