'use client'

import { useTransition } from 'react'
import { Button, Select, SimpleGrid, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { useForm, yupResolver } from '@mantine/form'
import { FaSave as SaveIcon } from 'react-icons/fa'
import { MdUpdate as UpdateIcon } from 'react-icons/md'

import ProductsMenu from './products'
import { addAsset, updateAsset } from '@actions/assets'
import { StatusMsg } from '@config/constants'
import { assetFormSchema } from '@schemas/asset.schema'
import { getMessage } from '@utils/notification'
import { TBranch, TAssetForm, TDivision, TCategory } from '@types'

type Props = {
  initialValues?: TAssetForm
  assetId?: number
  branches: TBranch[]
  divisions: TDivision[]
  categories: TCategory[]
}

const AssetForm = ({ initialValues, assetId, branches, divisions, categories }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, values, reset } = useForm<TAssetForm>({
    validate: yupResolver(assetFormSchema),
    initialValues: {
      branch_id: null,
      division_id: null,
      product_id: null,
      category: null,
      model: '',
      serial_number: '',
      status: 'active',
      current_location_type: 'Branch',
      current_location_id: '',
      remarks: '',
      ...initialValues
    }
  })

  const submitHandler = (formData: TAssetForm) =>
    startTransition(async () => {
      const val = { ...formData, current_location_id: formData.branch_id }
      const res = assetId ? await updateAsset(assetId, val) : await addAsset(val)

      showNotification(getMessage(res))

      if (res.status === StatusMsg.SUCCESS) {
        reset()
        closeAllModals()
      }
    })

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <SimpleGrid cols={values.branch_id === '1' ? 2 : 1} mb="xs">
        <Select
          label="Branch"
          placeholder="Select branch"
          data={branches.map(({ id, name, code }) => ({
            value: id.toString(),
            label: `${name} (${code})`
          }))}
          searchable
          withAsterisk
          {...getInputProps('branch_id')}
        />

        {values.branch_id === '1' && (
          <Select
            label="Division"
            placeholder="Select division"
            data={divisions.map(({ id, name }) => ({
              value: id.toString(),
              label: name
            }))}
            searchable
            withAsterisk
            {...getInputProps('division_id')}
          />
        )}
      </SimpleGrid>

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

      <TextInput label="Model" placeholder="Enter model" mb="xs" withAsterisk {...getInputProps('model')} />

      <TextInput
        label="Serial Number"
        placeholder="Enter serial number"
        mb="xs"
        withAsterisk
        {...getInputProps('serial_number')}
      />

      <Textarea label="Remarks" placeholder="Write remarks (if any)" rows={4} mb="sm" {...getInputProps('remarks')} />

      <Button type="submit" leftSection={assetId ? <UpdateIcon /> : <SaveIcon />} loading={isLoading}>
        {assetId ? 'Update' : 'Save'}
      </Button>
    </form>
  )
}

export default AssetForm
