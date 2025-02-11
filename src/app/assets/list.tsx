'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ActionIcon, Alert, Container, Group, Paper, Table, TextInput, Tooltip } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { useDebouncedValue } from '@mantine/hooks'
import { IoMdAdd as AddIcon } from 'react-icons/io'
import { FiSearch as SearchIcon } from 'react-icons/fi'

import AddAsset from './add'
import TitleBar from '@components/common/title-bar'
import TableNav from '@components/common/table-nav'
import useNavigation from '@hooks/useNavigation'
import { TAsset, TPaginatedRes } from '@types'

type Props = {
  data: TPaginatedRes<TAsset>
}

const AssetList = ({ data: { data, paginationInfo } }: Props) => {
  const searchParams = useSearchParams()!
  const { navigate } = useNavigation()

  const [interSearch, setInterSearch] = useState(searchParams.get('search') || '')
  const [search] = useDebouncedValue(interSearch, 400)

  const page = Number(searchParams.get('page')) || 1
  const limit = searchParams.get('limit') || '10'

  const handlePageChange = (val: number) => navigate({ page: val.toString() })
  const handleLimitChange = (val: string | null) => navigate({ limit: val! })

  const addCostHandler = () =>
    openModal({
      title: 'Add New Asset',
      children: <AddAsset />,
      centered: true
    })

  useEffect(() => {
    navigate({ search, page: '1' })
  }, [search])

  return (
    <Container>
      <Group justify="space-between" mb="xs">
        <TitleBar title="Asset List" url="/" />

        <Group gap="xs">
          <TextInput
            placeholder="Search here..."
            value={interSearch}
            onChange={(event) => setInterSearch(event.currentTarget.value)}
            leftSection={<SearchIcon />}
            miw={300}
          />

          <Tooltip label="Add New Repair Cost" withArrow position="bottom">
            <ActionIcon onClick={addCostHandler}>
              <AddIcon />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      {paginationInfo.totalRecords > 0 ? (
        <>
          <Paper shadow="xs" mb="xs">
            <Table verticalSpacing={10} horizontalSpacing="sm" striped highlightOnHover>
              <Table.Thead style={{ userSelect: 'none' }}>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  {/* <Table.Th></Table.Th> */}
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data.map(({ name }, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{name}</Table.Td>

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
            listName="assets"
            limit={limit}
            limitHandler={handleLimitChange}
            page={page}
            pageHandler={handlePageChange}
            totalPages={paginationInfo.totalPages}
            totalRecords={paginationInfo.totalRecords}
          />
        </>
      ) : (
        <Alert title="No assets found">Once any asset added, the list will appear here.</Alert>
      )}
    </Container>
  )
}

export default AssetList
