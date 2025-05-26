'use client'

import { useTransition } from 'react'
import { Button, Select, SimpleGrid, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { useForm, yupResolver } from '@mantine/form'
import { FaSave as SaveIcon } from 'react-icons/fa'
import { MdUpdate as UpdateIcon } from 'react-icons/md'

import ProductsMenu from './products'
import { addItem, updateItem } from '@actions/items'
import { StatusMsg } from '@config/constants'
import { assetItemSchema } from '@schemas/item.schema'
import { getMessage } from '@utils/notification'
import { TBrand, TAssetItemForm, TCategory } from '@types'

type Props = {
  initialValues?: TAssetItemForm
  itemId?: number
  brands: TBrand[]
  categories: TCategory[]
}

const AssetItemForm = ({ initialValues, itemId, brands, categories }: Props) => {
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, values, reset } = useForm<TAssetItemForm>({
    validate: yupResolver(assetItemSchema),
    initialValues: {
      category: null,
      product_id: null,
      brand_id: null,
      model: '',
      remarks: '',
      ...initialValues
    }
  })

  const submitHandler = (formData: TAssetItemForm) =>
    startTransition(async () => {
      const res = itemId ? await updateItem(itemId, formData) : await addItem(formData)

      showNotification(getMessage(res))

      if (res.status === StatusMsg.SUCCESS) {
        reset()
        closeAllModals()
      }
    })

  return (
    <form onSubmit={onSubmit(submitHandler)}>
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

      <SimpleGrid cols={2} mb="xs">
        <Select
          label="Brand"
          placeholder="Select brand"
          data={brands.map(({ id, name }) => ({
            value: id.toString(),
            label: name
          }))}
          searchable
          withAsterisk
          {...getInputProps('brand_id')}
        />

        <TextInput label="Model" placeholder="Enter model" withAsterisk {...getInputProps('model')} />
      </SimpleGrid>

      <Textarea label="Remarks" placeholder="Write remarks (if any)" rows={4} mb="sm" {...getInputProps('remarks')} />

      <Button type="submit" leftSection={itemId ? <UpdateIcon /> : <SaveIcon />} loading={isLoading}>
        {itemId ? 'Update' : 'Save'}
      </Button>
    </form>
  )
}

export default AssetItemForm
