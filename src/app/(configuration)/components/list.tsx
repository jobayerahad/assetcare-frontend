import { ActionIcon, Divider, Flex, Group, Loader, Paper, Table, Text, Title, Tooltip } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { MdDeleteOutline as DeleteIcon } from 'react-icons/md'

import { getComponents, deleteComponent } from '@actions/components'
import { getMessage } from '@utils/notification'
import { TProduct } from '@types'

type Props = {
  productId: string
}

const ComponentList = ({ productId }: Props) => {
  const queryClient = useQueryClient()

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['components', productId],
    queryFn: () => getComponents(productId),
    refetchOnWindowFocus: false
  })

  const deleteHandler = (componentId: number) =>
    openConfirmModal({
      title: 'Delete This Component?',
      children: (
        <Text size="sm">
          Are you sure you want to delete this component? This action is destructive and can't reverse.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red', variant: 'filled' },
      onConfirm: async () => {
        const res = await deleteComponent(+productId, componentId)
        showNotification(getMessage(res))
        queryClient.invalidateQueries({ queryKey: ['products', productId] })
      },
      centered: true
    })

  return (
    <>
      <Divider variant="dashed" my="xs" />

      <Paper shadow="xs" p="sm">
        {isLoading || isFetching ? (
          <Flex direction="column" align="center" gap="xs">
            <Loader />

            <Text size="sm">Fetching Data...</Text>
          </Flex>
        ) : (
          <>
            <Title order={4} size="md" mb="xs">
              Existing Components
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
                          {/* <Tooltip label="Edit" withArrow position="bottom">
                            <ActionIcon
                              variant="light"
                              color="blue"
                              size="sm"
                              onClick={() => editHandler(id, { name, description, category: categoryId })}
                            >
                              <EditIcon />
                            </ActionIcon>
                          </Tooltip> */}

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
              <Text size="sm">No component found</Text>
            )}
          </>
        )}
      </Paper>
    </>
  )
}

export default ComponentList
