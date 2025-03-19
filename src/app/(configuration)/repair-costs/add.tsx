'use client'

import { useEffect, useState, useTransition } from 'react'
import { Button, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { YearPickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { FaSave as SaveIcon } from 'react-icons/fa'

import { getAssetMenu } from '@actions/assets'
import { getVendorMenu } from '@actions/vendors'
import { addRepairCost } from '@actions/repair-costs'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'
import { TRepairCost } from '@types'

const AddRepairCost = () => {
  const [isLoading, startTransition] = useTransition()
  const [assets, setAssets] = useState<string[]>([])
  const [vendors, setVendors] = useState<string[]>([])

  const { onSubmit, getInputProps, reset } = useForm<Partial<TRepairCost>>({
    initialValues: {
      name: '',
      partName: '',
      cost: 0,
      vendor: '',
      year: new Date(),
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

  useEffect(() => {
    ;(async () => {
      const [assets, vendors] = await Promise.all([getAssetMenu(), getVendorMenu()])
      setAssets(assets)
      setVendors(vendors)
    })()
  }, [])

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <Select
        label="Asset Name"
        placeholder="Enter asset name"
        data={assets}
        mb="xs"
        required
        searchable
        {...getInputProps('name')}
      />

      <TextInput
        label="Part Name"
        placeholder="Enter asset's part name"
        mb="xs"
        required
        {...getInputProps('partName')}
      />

      <NumberInput
        label="Repair Cost"
        placeholder="Enter approved cost"
        thousandSeparator=","
        thousandsGroupStyle="lakh"
        hideControls
        mb="xs"
        required
        {...getInputProps('cost')}
      />

      <Select
        label="Vendor Name"
        placeholder="Enter vendor name"
        data={vendors}
        mb="xs"
        required
        searchable
        {...getInputProps('vendor')}
      />

      <YearPickerInput
        label="Pick year"
        placeholder="Pick year"
        maxDate={new Date()}
        mb="xs"
        required
        {...getInputProps('year')}
      />

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

export default AddRepairCost
