'use client'

import Link from 'next/link'
import pluralize from 'pluralize'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ActionIcon, Alert, Badge, Container, Group, Paper, Table, TextInput, Tooltip } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { FaEye as ViewIcon } from 'react-icons/fa'
import { FiSearch as SearchIcon } from 'react-icons/fi'

import TitleBar from '@components/common/title-bar'
import TableNav from '@components/common/table-nav'
import useNavigation from '@hooks/useNavigation'
import { getAssetStatus } from '@utils/helpers'
import { PaginationResponse, TAssetMaintenance } from '@types'

type Props = {
  data: PaginationResponse<TAssetMaintenance>
}

const MaintenanceList = ({ data: { data, meta } }: Props) => {
  const searchParams = useSearchParams()!
  const { navigate } = useNavigation()

  const [interSearch, setInterSearch] = useState(searchParams.get('search') || '')
  const [search] = useDebouncedValue(interSearch, 400)

  const page = Number(searchParams.get('page')) || 1
  const limit = searchParams.get('per_page') || '10'

  const handlePageChange = (val: number) => navigate({ page: val.toString() })
  const handleLimitChange = (val: string | null) => navigate({ per_page: val! })

  useEffect(() => {
    const currentSearch = searchParams.get('search') || ''
    if (search !== currentSearch) navigate({ search, page: '1' })
  }, [search])

  return (
    <Container size="lg">
      <Group justify="space-between" mb="xs">
        <TitleBar title="Asset Maintenance" />

        <Group gap="xs">
          <TextInput
            placeholder="Search here..."
            value={interSearch}
            onChange={(event) => setInterSearch(event.currentTarget.value)}
            leftSection={<SearchIcon />}
            miw={300}
          />
        </Group>
      </Group>

      {meta.total > 0 ? (
        <>
          <Paper shadow="xs" mb="xs">
            <Table verticalSpacing={10} horizontalSpacing="sm" striped highlightOnHover>
              <Table.Thead style={{ userSelect: 'none' }}>
                <Table.Tr>
                  <Table.Th>Sl.</Table.Th>
                  <Table.Th>Branch</Table.Th>
                  <Table.Th>Asset</Table.Th>
                  <Table.Th>Brand</Table.Th>
                  <Table.Th>Model</Table.Th>
                  <Table.Th>Serial No.</Table.Th>
                  <Table.Th>On Repair</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data.map((item, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{item.branch.code === '0001' ? item.division?.name : item.branch.name}</Table.Td>
                    <Table.Td>{item.asset?.item?.product?.name}</Table.Td>
                    <Table.Td>{item.asset.item?.brand?.name}</Table.Td>
                    <Table.Td>{item.asset.item?.model}</Table.Td>
                    <Table.Td>{item.asset.serial_number}</Table.Td>
                    <Table.Td>{new Date(item.created_at).toLocaleString('en-BD', { dateStyle: 'medium' })}</Table.Td>
                    <Table.Td>
                      <Badge variant="light" color={getAssetStatus(item.status).color}>
                        {getAssetStatus(item.status).label}
                      </Badge>
                    </Table.Td>

                    <Table.Td>
                      <Tooltip label="View Details" position="bottom" withArrow>
                        <ActionIcon variant="subtle" size="xs" component={Link} href={`/maintenance/${item.id}`}>
                          <ViewIcon />
                        </ActionIcon>
                      </Tooltip>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>

          <TableNav
            listName={pluralize('asset', meta.total)}
            limit={limit}
            limitHandler={handleLimitChange}
            page={page}
            pageHandler={handlePageChange}
            totalPages={meta.last_page}
            totalRecords={meta.total}
          />
        </>
      ) : (
        <Alert title="No Assets in Maintenance">
          As soon as an asset is added for maintenance, it will be displayed here as they become available
        </Alert>
      )}
    </Container>
  )
}

export default MaintenanceList
