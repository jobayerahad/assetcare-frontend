'use client'

import { useTransition } from 'react'
import { Button, Group, NumberInput, Radio, Select, SimpleGrid, Textarea } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { YearPickerInput } from '@mantine/dates'
import { useForm, yupResolver } from '@mantine/form'
import { FaSave as SaveIcon } from 'react-icons/fa'
import { MdUpdate as UpdateIcon } from 'react-icons/md'

import ProductsMenu from './products'
import ComponentsMenu from './components'
import { addServiceApproval, updateServiceApproval } from '@actions/service-approvals'
import { StatusMsg } from '@config/constants'
import { serviceApprovalSchema } from '@schemas/service-approval.schema'
import { getMessage } from '@utils/notification'
import { TCategory, TServiceApprovalForm, TVendor } from '@types'

type Props = {
  initialValues?: TServiceApprovalForm
  approvalId?: number
  categories: TCategory[]
  vendors: TVendor[]
}

const ServiceApprovalForm = ({ initialValues, approvalId, categories, vendors }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, values, reset } = useForm<TServiceApprovalForm>({
    validate: yupResolver(serviceApprovalSchema),
    initialValues: {
      category: null,
      product: null,
      component: null,
      vendor: null,
      cost: '',
      description: '',
      ...initialValues,
      is_selected: initialValues ? (initialValues?.is_selected ? '1' : '0') : '1',
      year: initialValues ? initialValues.year : '2023'
    }
  })

  const submitHandler = (formData: TServiceApprovalForm) =>
    startTransition(async () => {
      const is_selected = formData?.is_selected === '1' ? true : false
      // const year = formData?.year? formData?.year?.substring(0, 4) : ''
      const year = '2023'
      const values = { ...formData, is_selected, year, component_id: formData.component, vendor_id: formData.vendor }

      const res = approvalId ? await updateServiceApproval(approvalId, values) : await addServiceApproval(values)

      showNotification(getMessage(res))

      // if (res.status === StatusMsg.SUCCESS) closeAllModals()
    })

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <SimpleGrid cols={2} mb="xs">
        <Select
          label="Category"
          placeholder="Select category"
          data={categories.map(({ id, name }) => ({
            value: id.toString(),
            label: name
          }))}
          withAsterisk
          searchable
          {...getInputProps('category')}
        />

        <ProductsMenu categoryId={values.category!} getInputProps={getInputProps} />
        <ComponentsMenu productId={values.product!} getInputProps={getInputProps} />

        <Select
          label="Vendor"
          placeholder="Select vendor"
          data={vendors.map(({ id, name }) => ({
            value: id.toString(),
            label: name
          }))}
          searchable
          withAsterisk
          {...getInputProps('vendor')}
        />

        <NumberInput
          label="Price"
          placeholder="Enter price"
          thousandSeparator=","
          thousandsGroupStyle="lakh"
          withAsterisk
          hideControls
          {...getInputProps('cost')}
        />

        <YearPickerInput
          label="Year"
          placeholder="Select year"
          minDate={new Date(2013, 0, 1)}
          maxDate={new Date(new Date().getFullYear(), 11, 31)}
          withAsterisk
          {...getInputProps('year')}
        />
      </SimpleGrid>

      <Radio.Group label="Select if selected price or not" withAsterisk {...getInputProps('is_selected')} mb="xs">
        <Group mt={4}>
          <Radio value="1" label="Selected" />
          <Radio value="0" label="Not-Selected" />
        </Group>
      </Radio.Group>

      <Textarea
        label="Description"
        placeholder="Any additional details (if any)"
        rows={4}
        mb="sm"
        {...getInputProps('description')}
      />

      <Button type="submit" leftSection={approvalId ? <UpdateIcon /> : <SaveIcon />} loading={isLoading}>
        {approvalId ? 'Update' : 'Save'}
      </Button>
    </form>
  )
}

export default ServiceApprovalForm
