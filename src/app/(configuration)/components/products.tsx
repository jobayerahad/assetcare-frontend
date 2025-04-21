import { Select } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@actions/products'
import { TProduct } from '@types'

type Props = {
  categoryId: string
  getInputProps: any
}

const ProductsMenu = ({ categoryId, getInputProps }: Props) => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => getProducts(categoryId),
    refetchOnWindowFocus: false
  })

  return (
    <Select
      label="Product"
      placeholder="Select product"
      data={
        data && data?.length > 0
          ? data.map(({ id, name }: TProduct) => ({
              value: id.toString(),
              label: name
            }))
          : []
      }
      searchable
      mb="xs"
      required
      disabled={isLoading || isFetching}
      {...getInputProps('product')}
    />
  )
}

export default ProductsMenu
