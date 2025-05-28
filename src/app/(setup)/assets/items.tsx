import { Select } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { getAllItems } from '@actions/items'
import { TItem } from '@types'

type Props = {
  productId: string
  getInputProps: any
}

const ItemsMenu = ({ productId, getInputProps }: Props) => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['items', productId],
    queryFn: () => getAllItems(productId),
    refetchOnWindowFocus: false
  })

  return (
    <Select
      label="Item"
      placeholder="Select item"
      data={
        data && data?.length > 0
          ? data.map(({ id, model, brand }: TItem) => ({
              value: id.toString(),
              label: `Brand: ${brand.name}, Model: ${model}`
            }))
          : []
      }
      searchable
      withAsterisk
      disabled={isLoading || isFetching}
      {...getInputProps('item_id')}
    />
  )
}

export default ItemsMenu
