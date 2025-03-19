'use client'

import { useTransition } from 'react'
import { Button, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { FaSave as SaveIcon } from 'react-icons/fa'

import { addVendor } from '@actions/vendors'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'
import { TVendor } from '@types'

const AddVendor = () => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, reset } = useForm<Partial<TVendor>>({
    initialValues: {
      name: '',
      remarks: ''
    }
  })

  const submitHandler = (formData: Partial<TVendor>) =>
    startTransition(async () => {
      const res = await addVendor(formData)
      showNotification(getMessage(res))

      if (res.status === StatusMsg.SUCCESS) {
        reset()
        closeAllModals()
      }
    })

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <TextInput label="Vendor Name" placeholder="Enter vendor name" {...getInputProps('name')} mb="xs" required />

      <Textarea
        label="Remarks"
        placeholder="Any additional details (if any)"
        rows={4}
        {...getInputProps('remarks')}
        mb="sm"
      />

      <Button type="submit" leftSection={<SaveIcon />} loading={isLoading}>
        Save
      </Button>
    </form>
  )
}

export default AddVendor
