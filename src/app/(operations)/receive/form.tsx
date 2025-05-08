'use client'

import dayjs from 'dayjs'
import { useEffect, useTransition } from 'react'
import { Button, Container, Paper, Select, SimpleGrid, Textarea, TextInput } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { DateTimePicker } from '@mantine/dates'
import { showNotification } from '@mantine/notifications'
import { FaSave as SaveIcon } from 'react-icons/fa'

import TitleBar from '@components/common/title-bar'
import ProductsMenu from './products'
import AssetsMenu from './assets'
import { getAsset, transferAsset } from '@actions/assets'
import { StatusMsg } from '@config/constants'
import { assetTransferSchema } from '@schemas/asset.schema'
import { getMessage } from '@utils/notification'
import { capWords } from '@utils/helpers'
import { Employee, TAssetTransferForm, TBranch, TCategory, TDivision, TVendor } from '@types'

type Props = {
  categories: TCategory[]
  branches: TBranch[]
  divisions: TDivision[]
  vendors: TVendor[]
  user: Employee
}

const AssetReceiveForm = ({ categories, user, branches, divisions, vendors }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, values, setFieldValue, reset } = useForm<TAssetTransferForm>({
    validate: yupResolver(assetTransferSchema),
    initialValues: {
      asset_id: null,
      from_location_type: 'branch',
      from_location_id: null,
      to_location_type: user.branch.code === '0001' ? 'division' : 'branch',
      to_location_id:
        user.branch.code === '0001'
          ? divisions.find(({ name }) => user.department.toLowerCase() === name.toLowerCase())?.id.toString()!
          : branches.find(({ code }) => user.branch.code === code)?.id.toString()!,
      transfer_type: 'sent_for_repair', // If vendor then other
      transfer_date: new Date(),
      received_by: `${user.name}, ${user.designation} (${user.empId})`,
      category: null,
      product: null,
      remarks: ''
    }
  })

  const submitHandler = (formData: TAssetTransferForm) =>
    startTransition(async () => {
      const val: TAssetTransferForm = {
        ...formData,
        transfer_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        transfer_type: formData.from_location_type === 'vendor' ? 'returned_after_repair' : 'sent_for_repair'
      }

      const res = await transferAsset(val)

      showNotification(getMessage(res))
      if (res.status === StatusMsg.SUCCESS) reset()
    })

  useEffect(() => {
    ;(async () => {
      if (values.asset_id) {
        const data = await getAsset(values.asset_id)
        setFieldValue('from_location_type', data.current_location_type.toString())
        setFieldValue('from_location_id', data.current_location_id.toString())
      }
    })()
  }, [values.asset_id])

  return (
    <Container>
      <TitleBar title="Asset Receive" url="/" />

      <Paper component="form" shadow="xs" p="md" onSubmit={onSubmit(submitHandler)} mt="xs">
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

        <SimpleGrid cols={2} mb="xs">
          <Select
            label="Receiving From"
            data={['branch', 'division', 'vendor'].map((item) => ({
              label: capWords(item),
              value: item
            }))}
            readOnly
            allowDeselect={false}
            {...getInputProps('from_location_type')}
          />

          <Select
            label={capWords(values.from_location_type)}
            placeholder={`Select ${values.from_location_type}`}
            data={
              values.from_location_type === 'branch'
                ? branches.map(({ id, name, code }) => ({ value: id.toString(), label: `${name} (${code})` }))
                : values.from_location_type === 'division'
                ? divisions.map(({ id, name }) => ({ value: id.toString(), label: name }))
                : vendors.map(({ id, name }) => ({ value: id.toString(), label: name }))
            }
            searchable
            readOnly
            {...getInputProps('from_location_id')}
          />
        </SimpleGrid>

        <Textarea
          label="Remarks"
          placeholder="Write remarks (optional)"
          rows={4}
          mb="sm"
          {...getInputProps('remarks')}
        />

        <Button type="submit" leftSection={<SaveIcon />} loading={isLoading}>
          Save
        </Button>
      </Paper>
    </Container>
  )
}

export default AssetReceiveForm
