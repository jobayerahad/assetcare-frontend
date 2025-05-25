'use client'

import { useTransition } from 'react'
import { Button, Container, Paper, Select, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { useQueryClient } from '@tanstack/react-query'
import { FaSave as SaveIcon } from 'react-icons/fa'
import { MdUpdate as UpdateIcon } from 'react-icons/md'

import ProductList from './list'
import TitleBar from '@components/common/title-bar'
import { addProduct, updateProduct } from '@actions/products'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'
import { TCategory, TProductForm } from '@types'

type Props = {
  initialValues?: TProductForm
  productId?: number
  categories: TCategory[]
}

const ProductForm = ({ initialValues, productId, categories }: Props) => {
  const queryClient = useQueryClient()
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, values, reset } = useForm<TProductForm>({
    initialValues: {
      name: '',
      description: '',
      category: null,
      ...initialValues
    }
  })

  const submitHandler = (formData: TProductForm) =>
    startTransition(async () => {
      const res = productId ? await updateProduct(productId, formData) : await addProduct(formData)

      showNotification(getMessage(res))

      if (res.status === StatusMsg.SUCCESS) {
        productId ? closeAllModals() : reset()
        queryClient.invalidateQueries({ queryKey: ['products', formData.category] })
      }
    })

  const form = (
    <form onSubmit={onSubmit(submitHandler)}>
      <Select
        label="Category"
        placeholder="Select category"
        data={categories.map(({ id, name }) => ({
          value: id.toString(),
          label: name
        }))}
        searchable
        mb="xs"
        required={!productId}
        disabled={!!productId}
        {...getInputProps('category')}
      />

      <TextInput label="Product Name" placeholder="Enter product name" {...getInputProps('name')} mb="xs" required />

      <Textarea
        label="Description"
        placeholder="Any additional details (if any)"
        rows={4}
        mb="sm"
        {...getInputProps('description')}
      />

      <Button type="submit" leftSection={productId ? <UpdateIcon /> : <SaveIcon />} loading={isLoading}>
        {productId ? 'Update' : 'Save'}
      </Button>
    </form>
  )

  if (productId) return form
  else
    return (
      <Container size="sm">
        <TitleBar title="Add Product" />

        <Paper shadow="xs" p="sm" mt="xs">
          {form}
        </Paper>

        {values.category && (
          <ProductList
            categoryId={values.category}
            title={categories.find(({ id }) => id.toString() === values.category)?.name ?? ''}
            categories={categories}
          />
        )}
      </Container>
    )
}

export default ProductForm
