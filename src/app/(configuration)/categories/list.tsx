'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ActionIcon, Alert, Container, Group, Menu, Paper, Table, Text, TextInput, Tooltip } from '@mantine/core'
import { openConfirmModal, openModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useDebouncedValue } from '@mantine/hooks'
import { IoMdAdd as AddIcon, IoIosMore as MoreIcon } from 'react-icons/io'
import { FiSearch as SearchIcon } from 'react-icons/fi'
import { MdDeleteOutline as DeleteIcon, MdEdit as EditIcon } from 'react-icons/md'

import CategoryForm from './form'
import TitleBar from '@components/common/title-bar'
import TableNav from '@components/common/table-nav'
import useNavigation from '@hooks/useNavigation'
import { deleteCategory } from '@actions/categories'
import { getMessage } from '@utils/notification'
import { PaginationResponse, TCategory } from '@types'

type Props = {
  data: PaginationResponse<TCategory>
}

const CategoryList = ({ data: { data, meta } }: Props) => {
  const searchParams = useSearchParams()!
  const { navigate } = useNavigation()

  const [interSearch, setInterSearch] = useState(searchParams.get('search') || '')
  const [search] = useDebouncedValue(interSearch, 400)

  const page = Number(searchParams.get('page')) || 1
  const limit = searchParams.get('per_page') || '10'

  const handlePageChange = (val: number) => navigate({ page: val.toString() })
  const handleLimitChange = (val: string | null) => navigate({ per_page: val! })

  const addHandler = () =>
    openModal({
      title: 'Add New Category',
      children: <CategoryForm />,
      size: 'lg',
      closeOnClickOutside: false,
      centered: true
    })

  const editHandler = (id: number, data: Partial<TCategory>) =>
    openModal({
      title: 'Edit Category',
      children: <CategoryForm categoryId={id} initialValues={data} />,
      size: 'lg',
      closeOnClickOutside: false,
      centered: true
    })

  const deleteHandler = (id: number) =>
    openConfirmModal({
      title: 'Delete This Category?',
      children: (
        <Text size="sm">
          Are you sure you want to delete this category? This action is destructive and can't reverse.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red', variant: 'filled' },
      onConfirm: async () => {
        const res = await deleteCategory(id)
        showNotification(getMessage(res))
      },
      centered: true
    })

  useEffect(() => {
    const currentSearch = searchParams.get('search') || ''
    if (search !== currentSearch) navigate({ search, page: '1' })
  }, [search])

  return (
    <Container>
      <Group justify="space-between" mb="xs">
        <TitleBar title="Category List" />

        <Group gap="xs">
          <TextInput
            placeholder="Search here..."
            value={interSearch}
            onChange={(event) => setInterSearch(event.currentTarget.value)}
            leftSection={<SearchIcon />}
            miw={300}
          />

          <Tooltip label="Add Category" withArrow position="bottom">
            <ActionIcon onClick={addHandler}>
              <AddIcon />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      {meta.total > 0 ? (
        <>
          <Paper shadow="xs" mb="xs">
            <Table verticalSpacing={10} horizontalSpacing="sm" striped highlightOnHover>
              <Table.Thead style={{ userSelect: 'none' }}>
                <Table.Tr>
                  <Table.Th>Sl.</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data.map(({ id, name, description }, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{name}</Table.Td>
                    <Table.Td>{description}</Table.Td>

                    <Table.Td>
                      <Menu shadow="md" withArrow>
                        <Menu.Target>
                          <ActionIcon variant="subtle" size="sm">
                            <MoreIcon />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item leftSection={<EditIcon />} onClick={() => editHandler(id, { name, description })}>
                            Edit
                          </Menu.Item>

                          <Menu.Item color="red" leftSection={<DeleteIcon />} onClick={() => deleteHandler(id)}>
                            Delete
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>

          <TableNav
            listName="categories"
            limit={limit}
            limitHandler={handleLimitChange}
            page={page}
            pageHandler={handlePageChange}
            totalPages={meta.last_page}
            totalRecords={meta.total}
          />
        </>
      ) : (
        <Alert title="No categories found">Once any category added, the list will appear here.</Alert>
      )}
    </Container>
  )
}

export default CategoryList
