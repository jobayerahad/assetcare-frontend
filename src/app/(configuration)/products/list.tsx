import { Divider, Flex, Group, List, Loader, Paper, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@actions/products'
import { TProduct } from '@types'

type Props = {
  categoryId: string
  title: string
}

const ProductList = ({ categoryId, title }: Props) => {
  const { isLoading, data } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => getProducts(categoryId),
    refetchOnWindowFocus: false
  })

  return (
    <>
      <Divider variant="dashed" my="xs" />

      <Paper shadow="xs" p="md">
        {isLoading ? (
          <Flex direction="column" align="center" gap="xs">
            <Loader />

            <Text size="sm">Fetching Data...</Text>
          </Flex>
        ) : (
          <>
            <Title order={4} size="md" mb="xs">
              Existing Products | {title}
            </Title>

            {data?.length > 0 ? (
              <List withPadding>
                {data?.map(({ name }: TProduct, index: number) => (
                  <List.Item key={index}>{name}</List.Item>
                ))}
              </List>
            ) : (
              <Text size="sm">No product found</Text>
            )}
          </>
        )}
      </Paper>
    </>
  )
}

export default ProductList
