'use client'

import { useSearchParams } from 'next/navigation'
import { ActionIcon, Alert, Container, Group, Paper, Select, Table, Tooltip } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { FaEye as ViewIcon } from 'react-icons/fa6'

import ViewLog from './view'
import TitleBar from '@components/common/title-bar'
import TableNav from '@components/common/table-nav'
import useNavigation from '@hooks/useNavigation'
import { capWords } from '@utils/helpers'
import { PaginationResponse, TLog, TLogFiler } from '@types'

type Props = {
  data: PaginationResponse<TLog>
  filters: TLogFiler
}

const LogList = ({ data: { data, meta }, filters }: Props) => {
  const searchParams = useSearchParams()!
  const { navigate } = useNavigation()

  const page = Number(searchParams.get('page')) || 1
  const limit = searchParams.get('per_page') || '10'
  const action = searchParams.get('action') || ''
  const model = searchParams.get('model') || ''
  const user = searchParams.get('user_id') || ''

  const handlePageChange = (val: number) => navigate({ page: val.toString() })
  const handleLimitChange = (val: string | null) => navigate({ per_page: val! })
  const handleActionChange = (val: string | null) => navigate({ action: val || '' })
  const handleModelChange = (val: string | null) => navigate({ model: val || '' })
  const handleUserChange = (val: string | null) => navigate({ user_id: val || '' })

  const viewHandler = (data: TLog) =>
    openModal({
      title: 'View Log',
      children: <ViewLog data={data} />,
      size: 'lg',
      centered: true
    })

  return (
    <Container size="lg">
      <Group mb="xs" justify="space-between">
        <TitleBar title="Logs" />

        <Group gap="xs">
          <Select
            label="User"
            placeholder="Select Model"
            data={filters.users.map((item) => ({
              value: item.id.toString(),
              label: item.name
            }))}
            value={user}
            onChange={handleUserChange}
            size="xs"
            searchable
            w={200}
          />

          <Select
            label="Model"
            placeholder="Select Model"
            data={filters.models.map((item) => ({
              value: item,
              label: capWords(item)
            }))}
            value={model}
            onChange={handleModelChange}
            size="xs"
          />

          <Select
            label="Action"
            placeholder="Select Action"
            data={filters.actions.map((item) => ({
              value: item,
              label: capWords(item)
            }))}
            value={action}
            onChange={handleActionChange}
            size="xs"
          />
        </Group>
      </Group>

      {meta.total > 0 ? (
        <>
          <Paper shadow="xs" mb="xs">
            <Table verticalSpacing={10} horizontalSpacing="sm" striped highlightOnHover>
              <Table.Thead style={{ userSelect: 'none' }}>
                <Table.Tr>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Action</Table.Th>
                  <Table.Th>Model</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data.map((log, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      {new Date(log.created_at).toLocaleString('en-BD', { dateStyle: 'medium', timeStyle: 'short' })}
                    </Table.Td>

                    <Table.Td>{log.user?.name ?? 'System'}</Table.Td>
                    <Table.Td>{log.action.toUpperCase()}</Table.Td>
                    <Table.Td>{log.loggable_type.split('\\').pop()}</Table.Td>

                    <Table.Td>
                      <Tooltip label="View" position="bottom" withArrow>
                        <ActionIcon variant="subtle" size="sm" onClick={() => viewHandler(log)}>
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
            listName="logs"
            limit={limit}
            limitHandler={handleLimitChange}
            page={page}
            pageHandler={handlePageChange}
            totalPages={meta.last_page}
            totalRecords={meta.total}
          />
        </>
      ) : (
        <Alert title="No logs found">Once any log found, the list will appear here.</Alert>
      )}
    </Container>
  )
}

export default LogList
