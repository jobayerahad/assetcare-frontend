'use client'

import { useTransition } from 'react'
import { Button, Container, Paper, Select, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { closeAllModals } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { useQueryClient } from '@tanstack/react-query'
import { FaSave as SaveIcon } from 'react-icons/fa'
import { MdUpdate as UpdateIcon } from 'react-icons/md'

import ProductsMenu from './products'
import ProductList from './list'
import TitleBar from '@components/common/title-bar'
import { addComponent, updateComponent } from '@actions/components'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'
import { TCategory, TComponentForm } from '@types'

type Props = {
  initialValues?: TComponentForm
  productId?: number
  categories: TCategory[]
}

const ComponentForm = ({ initialValues, productId, categories }: Props) => {
  const queryClient = useQueryClient()
  const [isLoading, startTransition] = useTransition()

  const { onSubmit, getInputProps, values, reset } = useForm<TComponentForm>({
    initialValues: {
      name: '',
      description: '',
      category: null,
      product: null,
      ...initialValues
    }
  })

  const submitHandler = (formData: TComponentForm) =>
    startTransition(async () => {
      const res = productId ? await updateComponent(productId, formData) : await addComponent(formData)

      showNotification(getMessage(res))

      if (res.status === StatusMsg.SUCCESS) {
        // productId ? closeAllModals() : reset()
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

      <ProductsMenu categoryId={values.category!} getInputProps={getInputProps} />

      <TextInput
        label="Component Name"
        placeholder="Enter component name"
        mb="xs"
        required
        {...getInputProps('name')}
      />

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
        <TitleBar title="Add Component" />

        <Paper shadow="xs" p="sm" mt="xs">
          {form}
        </Paper>

        {values.product && <ProductList productId={values.product} />}
      </Container>
    )
}

export default ComponentForm
