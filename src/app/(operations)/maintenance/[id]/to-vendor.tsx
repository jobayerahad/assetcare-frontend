import dayjs from 'dayjs'
import { useTransition } from 'react'
import { Button, Select, SimpleGrid, Textarea, TextInput } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useForm, yupResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { FaSave as SaveIcon } from 'react-icons/fa'

import { sendToVendorAsset } from '@actions/maintenance'
import { StatusMsg } from '@config/constants'
import { assetTransferSchema } from '@schemas/asset.schema'
import { getMessage } from '@utils/notification'
import { TAssetTransferForm, TVendor } from '@types'

type Props = {
  assetId: number
  repairId: number
  vendors: TVendor[]
}

const ToVendor = ({ assetId, repairId, vendors }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps } = useForm<TAssetTransferForm>({
    validate: yupResolver(assetTransferSchema),
    initialValues: {
      asset_id: assetId.toString(),
      from_location_type: 'division',
      from_location_id: '15',
      to_location_type: 'vendor',
      to_location_id: null,
      transfer_type: 'sent_for_repair',
      transfer_date: new Date(),
      received_by: '',
      category: 'a', // For Override Validation
      product: 'b', // For Override Validation
      remarks: ''
    }
  })

  const submitHandler = (formData: TAssetTransferForm) =>
    startTransition(async () => {
      const val = {
        received_by: formData.received_by,
        vendor_id: formData.to_location_id,
        transfer_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        remarks: formData.remarks
      }

      const res = await sendToVendorAsset(repairId, val)
      showNotification(getMessage(res))

      if (res.status === StatusMsg.SUCCESS) closeAllModals()
    })

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
