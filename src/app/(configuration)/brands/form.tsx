'use client'

import { useTransition } from 'react'
import { Button, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { FaSave as SaveIcon } from 'react-icons/fa'
import { MdUpdate as UpdateIcon } from 'react-icons/md'

import { addBrand, updateBrand } from '@actions/brands'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'
import { TBrand } from '@types'

type Props = {
  initialValues?: Partial<TBrand>
  brandId?: number
}

const BrandForm = ({ initialValues, brandId }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, reset } = useForm<Partial<TBrand>>({
    initialValues: {
      name: '',
      remarks: '',
      ...initialValues
    }
  })

  const submitHandler = (formData: Partial<TBrand>) =>
    startTransition(async () => {
      const res = brandId ? await updateBrand(brandId, formData) : await addBrand(formData)

      showNotification(getMessage(res))

      if (res.status === StatusMsg.SUCCESS) {
        reset()
        closeAllModals()
      }
    })

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <TextInput label="Brand Name" placeholder="Enter brand name" {...getInputProps('name')} mb="xs" required />

      <Textarea
        label="Remarks"
        placeholder="Any additional details (if any)"
        rows={4}
        mb="sm"
        {...getInputProps('remarks')}
      />

      <Button type="submit" leftSection={brandId ? <UpdateIcon /> : <SaveIcon />} loading={isLoading}>
        {brandId ? 'Update' : 'Save'}
      </Button>
    </form>
  )
}

export default BrandForm
