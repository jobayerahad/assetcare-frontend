import { ActionIcon, Divider, Flex, Group, Loader, Paper, Table, Text, Title, Tooltip } from '@mantine/core'
import { openConfirmModal, openModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { MdDeleteOutline as DeleteIcon, MdEdit as EditIcon } from 'react-icons/md'

import ProductForm from './form'
import { deleteProduct, getProducts } from '@actions/products'
import { getMessage } from '@utils/notification'
import { TCategory, TProduct, TProductForm } from '@types'

type Props = {
  categoryId: string
  title: string
  categories: TCategory[]
}

const ProductList = ({ categoryId, title, categories }: Props) => {
  const queryClient = useQueryClient()

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => getProducts(categoryId),
    refetchOnWindowFocus: false
  })

  const editHandler = (productId: number, data: TProductForm) =>
    openModal({
      title: 'Edit Product',
      children: <ProductForm productId={productId} initialValues={data} categories={categories} />,
      size: 'lg',
      closeOnClickOutside: false,
      centered: true
    })

  const deleteHandler = (productId: number) =>
    openConfirmModal({
      title: 'Delete This Product?',
      children: (
        <Text size="sm">
          Are you sure you want to delete this product? This action is destructive and can't reverse.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red', variant: 'filled' },
      onConfirm: async () => {
        const res = await deleteProduct(+categoryId, productId)
        showNotification(getMessage(res))
        queryClient.invalidateQueries({ queryKey: ['products', categoryId] })
      },
      centered: true
    })

  return (
    <>
      <Divider variant="dashed" my="xs" />

      <Paper shadow="xs" p="md">
        {isLoading || isFetching ? (
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
              <Table withTableBorder withColumnBorders>
                <Table.Tbody>
                  {data?.map(({ name, description, id }: TProduct, index: number) => (
                    <Table.Tr key={index}>
                      <Table.Td w={20}>{index + 1}</Table.Td>

                      <Table.Td>{name}</Table.Td>

                      <Table.Td w={100}>
                        <Group gap={8}>
                          <Tooltip label="Edit" withArrow position="bottom">
                            <ActionIcon
                              variant="light"
                              color="blue"
                              size="sm"
                              onClick={() => editHandler(id, { name, description, category: categoryId })}
                            >
                              <EditIcon />
                            </ActionIcon>
                          </Tooltip>

                          <Tooltip label="Delete" withArrow position="bottom">
                            <ActionIcon variant="light" color="red" size="sm" onClick={() => deleteHandler(id)}>
                              <DeleteIcon />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
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
