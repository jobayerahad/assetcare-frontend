'use client'

import { useTransition } from 'react'
import { Button, NumberInput, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { FaSave as SaveIcon } from 'react-icons/fa'

import { addRepairCost } from '@actions/repair-costs'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'
import { TRepairCost } from '@types'

const AddRepairCost = () => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, reset } = useForm<Partial<TRepairCost>>({
    initialValues: {
      name: '',
      partName: '',
      repairCost: 0,
      remarks: ''
    }
  })

  const submitHandler = (formData: Partial<TRepairCost>) =>
    startTransition(async () => {
      const res = await addRepairCost(formData)
      showNotification(getMessage(res))

      if (res.status === StatusMsg.SUCCESS) {
        reset()
        closeAllModals()
      }
    })

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <TextInput label="Asset Name" placeholder="Enter asset name" {...getInputProps('name')} mb="xs" required />

      <TextInput
        label="Part Name"
        placeholder="Enter asset's part name"
        {...getInputProps('partName')}
        mb="xs"
        required
      />

      <NumberInput
        label="Repair Cost"
        placeholder="Enter approved cost"
        {...getInputProps('repairCost')}
        hideControls
        mb="xs"
        required
      />

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

export default AddRepairCost
