import { Select } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { getAllAsset } from '@actions/assets'
import { TAsset } from '@types'

type Props = {
  productId: string
  getInputProps: any
}

const AssetsMenu = ({ productId, getInputProps }: Props) => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['assets', productId],
    queryFn: () => getAllAsset(productId),
    refetchOnWindowFocus: false
  })

  return (
    <Select
      label="Asset"
      placeholder="Select asset"
      data={
        data && data?.length > 0
          ? data.map(({ id, serial_number, model, brand }: TAsset) => ({
              value: id.toString(),
              label: `Brand: ${brand}, Model: ${model}, Sl: ${serial_number}`
            }))
          : []
      }
      searchable
      withAsterisk
      disabled={isLoading || isFetching}
      mb="xs"
      {...getInputProps('asset_id')}
    />
  )
}

export default AssetsMenu
