'use client'

import { useTransition } from 'react'
import { Button, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { MdUpdate as UpdateIcon } from 'react-icons/md'

import { editAsset } from '@actions/assets'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'
import { TAsset } from '@types'

type Props = {
  initialData: TAsset
}

const EditAsset = ({ initialData }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, reset } = useForm<Partial<TAsset>>({
    initialValues: {
      name: initialData.name,
      remarks: initialData.remarks
    }
  })

  const submitHandler = (formData: Partial<TAsset>) =>
    startTransition(async () => {
      const res = await editAsset(initialData._id!, formData)
      showNotification(getMessage(res))

      if (res.status === StatusMsg.SUCCESS) {
        reset()
        closeAllModals()
      }
    })

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <TextInput label="Asset Name" placeholder="Enter asset name" mb="xs" required {...getInputProps('name')} />

      <Textarea
        label="Remarks"
        placeholder="Any edititional details (if any)"
        rows={4}
        mb="sm"
        {...getInputProps('remarks')}
      />

      <Button type="submit" leftSection={<UpdateIcon />} loading={isLoading}>
        Update
      </Button>
    </form>
  )
}

export default EditAsset
