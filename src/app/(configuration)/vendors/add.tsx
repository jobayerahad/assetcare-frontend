'use client'

import { useTransition } from 'react'
import { Button, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { FaSave as SaveIcon } from 'react-icons/fa'
import { MdUpdate as UpdateIcon } from 'react-icons/md'

import { addVendor, updateVendor } from '@actions/vendors'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'
import { TVendor } from '@types'

type Props = {
  initialValues?: Partial<TVendor>
  vendorId?: number
}

const VendorForm = ({ initialValues, vendorId }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, reset } = useForm<Partial<TVendor>>({
    initialValues: {
      name: '',
      description: '',
      ...initialValues
    }
  })

  const submitHandler = (formData: Partial<TVendor>) =>
    startTransition(async () => {
      const res = vendorId ? await updateVendor(vendorId, formData) : await addVendor(formData)

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
        label="Description"
        placeholder="Any additional details (if any)"
        rows={4}
        mb="sm"
        {...getInputProps('description')}
      />

      <Button type="submit" leftSection={vendorId ? <UpdateIcon /> : <SaveIcon />} loading={isLoading}>
        {vendorId ? 'Update' : 'Save'}
      </Button>
    </form>
  )
}

export default VendorForm
