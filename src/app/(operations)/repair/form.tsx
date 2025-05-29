'use client'

import dayjs from 'dayjs'
import { useTransition } from 'react'
import { Button, Container, NumberInput, Paper, Select, SimpleGrid, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { DateTimePicker } from '@mantine/dates'
import { FaSave as SaveIcon } from 'react-icons/fa'

import ProductsMenu from './products'
import AssetsMenu from './assets'
import TitleBar from '@components/common/title-bar'
import { addRepair } from '@actions/maintenance'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'
import { TCategory, TVendor } from '@types'

type Props = {
  categories: TCategory[]
  vendors: TVendor[]
}

const RepairForm = ({ categories, vendors }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, values, setFieldValue, reset } = useForm({
    initialValues: {
      category: null,
      product: null,
      asset_id: null,
      vendor_id: null,
      repair_type: 'external',
      status: 'repaired',
      repair_cost: 0,
      repair_details: '',
      repair_date: new Date()
    }
  })

  const submitHandler = (formData: any) =>
    startTransition(async () => {
      const res = await addRepair({
        ...formData,
        repair_date: dayjs(formData.repair_date).format('YYYY-MM-DD HH:mm:ss')
      })

      showNotification(getMessage(res))
      // if (res.status === StatusMsg.SUCCESS) reset()
    })

  return (
    <Container>
      <TitleBar title="Asset Repair Info" />

      <Paper component="form" shadow="xs" p="md" onSubmit={onSubmit(submitHandler)} mt="xs">
        <DateTimePicker
          label="Date & Time"
          placeholder="Select date & time"
          minDate={new Date('2013-04-01')}
          maxDate={new Date()}
          valueFormat="DD MMM YYYY, hh:mm A"
          required
          mb="xs"
          {...getInputProps('repair_date')}
        />

        <SimpleGrid cols={values.category ? 2 : 1} mb="xs">
          <Select
            label="Category"
            placeholder="Select category"
            data={categories.map(({ id, name }) => ({
              value: id.toString(),
              label: name
            }))}
            searchable
            withAsterisk
            {...getInputProps('category')}
          />

          {values.category && <ProductsMenu categoryId={values.category!} getInputProps={getInputProps} />}
        </SimpleGrid>

        {values.product && <AssetsMenu productId={values.product!} getInputProps={getInputProps} />}

        <Select
          label="Vendor"
          placeholder="Select vendor"
          data={vendors.map(({ id, name }) => ({
            value: id.toString(),
            label: name
          }))}
          searchable
          withAsterisk
          mb="xs"
          {...getInputProps('vendor_id')}
        />

        <NumberInput
          label="Repair Cost"
          placeholder="Enter repair cost"
          mb="xs"
          withAsterisk
          hideControls
          {...getInputProps('repair_cost')}
        />

        <Textarea
          label="Repaid Details"
          placeholder="Write repair details (optional)"
          rows={4}
          mb="sm"
          {...getInputProps('repair_details')}
        />

        <Button type="submit" leftSection={<SaveIcon />} loading={isLoading}>
          Save
        </Button>
      </Paper>
    </Container>
  )
}

export default RepairForm
