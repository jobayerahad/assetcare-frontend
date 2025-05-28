import { Select } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { getComponents } from '@actions/components'
import { TComponent } from '@types'

type Props = {
  productId: string
  getInputProps: any
}

const ComponentsMenu = ({ productId, getInputProps }: Props) => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['components', productId],
    queryFn: () => getComponents(productId),
    refetchOnWindowFocus: false
  })

  return (
    <Select
      label="Component"
      placeholder="Select component"
      data={
        data && data?.length > 0
          ? data.map(({ id, name }: TComponent) => ({
              value: id.toString(),
              label: name
            }))
          : []
      }
      searchable
      required
      disabled={isLoading || isFetching}
      {...getInputProps('component_id')}
    />
  )
}

export default ComponentsMenu
