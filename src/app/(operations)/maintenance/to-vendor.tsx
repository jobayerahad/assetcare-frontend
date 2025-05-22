import dayjs from 'dayjs'
import { useTransition } from 'react'
import { Button, Select, SimpleGrid, Textarea, TextInput } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useForm, yupResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { FaSave as SaveIcon } from 'react-icons/fa'

import { transferAsset } from '@actions/assets'
import { StatusMsg } from '@config/constants'
import { assetTransferSchema } from '@schemas/asset.schema'
import { getMessage } from '@utils/notification'
import { TAsset, TAssetTransferForm, TVendor } from '@types'

type Props = {
  data: TAsset
  vendors: TVendor[]
}

const ToVendor = ({ data, vendors }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, errors } = useForm<TAssetTransferForm>({
    validate: yupResolver(assetTransferSchema),
    initialValues: {
      asset_id: data.id.toString(),
      from_location_type: data.current_location_type,
      from_location_id: data.current_location_id.toString(),
      to_location_type: 'vendor',
      to_location_id: null,
      transfer_type: 'sent_for_repair', // If vendor then other
      transfer_date: new Date(),
      received_by: '',
      category: data.product?.category?.id.toString(),
      product: data.product?.id.toString(),
      remarks: ''
    }
  })

  const submitHandler = (formData: TAssetTransferForm) =>
    startTransition(async () => {
      const val: TAssetTransferForm = {
        ...formData,
        transfer_date: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }

      const res = await transferAsset(val)

      showNotification(getMessage(res))
      if (res.status === StatusMsg.SUCCESS) closeAllModals()
    })

  console.log(errors)

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <DateTimePicker
        label="Date & Time"
        placeholder="Select date & time"
        minDate={new Date('2013-04-01')}
        maxDate={new Date()}
        valueFormat="DD MMM YYYY, hh:mm A"
        required
        mb="xs"
        {...getInputProps('transfer_date')}
      />

      <SimpleGrid cols={2} mb="xs">
        <TextInput label="Category" value={data.product?.category?.name} readOnly />
        <TextInput label="Product" value={data.product?.name} readOnly />

        <TextInput label="Model" value={data.model} readOnly />
        <TextInput label="Serial No" value={data.serial_number} readOnly />

        <Select
          label="Vendor"
          placeholder="Select vendor"
          data={vendors.map(({ id, name }) => ({
            value: id.toString(),
            label: name
          }))}
          searchable
          withAsterisk
          {...getInputProps('to_location_id')}
        />
        <TextInput label="Received By" placeholder="Enter receiver person name" {...getInputProps('received_by')} />
      </SimpleGrid>

      <Textarea label="Remarks" placeholder="Write remarks (optional)" rows={4} mb="sm" {...getInputProps('remarks')} />

      <Button type="submit" leftSection={<SaveIcon />} loading={isLoading}>
        Save
      </Button>
    </form>
  )
}

export default ToVendor
