'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ActionIcon, Alert, Container, Group, Paper, Table, TextInput, Tooltip } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { useDebouncedValue } from '@mantine/hooks'
import { IoMdAdd as AddIcon } from 'react-icons/io'
import { FiSearch as SearchIcon } from 'react-icons/fi'

import AddCategory from './add'
import TitleBar from '@components/common/title-bar'
import TableNav from '@components/common/table-nav'
import useNavigation from '@hooks/useNavigation'
import { PaginationResponse, TCategory } from '@types'

type Props = {
  data: PaginationResponse<TCategory>
}

const CategoryList = ({ data: { data, total, per_page, current_page } }: Props) => {
  const searchParams = useSearchParams()!
  const { navigate } = useNavigation()

  const [interSearch, setInterSearch] = useState(searchParams.get('search') || '')
  const [search] = useDebouncedValue(interSearch, 400)

  const page = Number(searchParams.get('page')) || current_page
  const limit = searchParams.get('per_page') || per_page.toString()

  const handlePageChange = (val: number) => navigate({ page: val.toString() })
  const handleLimitChange = (val: string | null) => navigate({ per_page: val! })

  const addCostHandler = () =>
    openModal({
      title: 'Add New Category',
      children: <AddCategory />,
      centered: true
    })

  useEffect(() => {
    navigate({ search, page: '1' })
  }, [search])

  return (
    <Container>
      <Group justify="space-between" mb="xs">
        <TitleBar title="Category List" url="/" />

        <Group gap="xs">
          <TextInput
            placeholder="Search here..."
            value={interSearch}
            onChange={(event) => setInterSearch(event.currentTarget.value)}
            leftSection={<SearchIcon />}
            miw={300}
          />

          <Tooltip label="Add Category" withArrow position="bottom">
            <ActionIcon onClick={addCostHandler}>
              <AddIcon />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      {total > 0 ? (
        <>
          <Paper shadow="xs" mb="xs">
            <Table verticalSpacing={10} horizontalSpacing="sm" striped highlightOnHover>
              <Table.Thead style={{ userSelect: 'none' }}>
                <Table.Tr>
                  <Table.Th>Sl.</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Remarks</Table.Th>
                  {/* <Table.Th></Table.Th> */}
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data.map(({ name, remarks }, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{name}</Table.Td>
                    <Table.Td>{remarks}</Table.Td>

                    {/* <Table.Td>
                      <ActionIcon component={Link} href={`/repair-costs/${_id}`} size="sm" variant="subtle">
                        <ViewIcon />
                      </ActionIcon>
                    </Table.Td> */}
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
            totalPages={Math.ceil(total / per_page)}
            totalRecords={total}
          />
        </>
      ) : (
        <Alert title="No categories found">Once any category added, the list will appear here.</Alert>
      )}
    </Container>
  )
}

export default CategoryList
