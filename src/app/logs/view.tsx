import { Table, Text } from '@mantine/core'
import { TLog } from '@types'

type Props = {
  data: TLog
}

const ViewLog = ({ data }: Props) => (
  <Table striped withColumnBorders>
    <Table.Tbody>
      <Table.Tr>
        <Table.Th>Date</Table.Th>
        <Table.Td>
          {new Date(data.created_at).toLocaleString('en-BD', { dateStyle: 'long', timeStyle: 'medium' })}
        </Table.Td>
      </Table.Tr>

      <Table.Tr>
        <Table.Th>User</Table.Th>
        <Table.Td>{data.user ? `${data.user.name}, ${data.user.id}` : 'System'}</Table.Td>
      </Table.Tr>

      <Table.Tr>
        <Table.Th>Action</Table.Th>
        <Table.Td>{data.action.toUpperCase()}</Table.Td>
      </Table.Tr>

      <Table.Tr>
        <Table.Th>Model</Table.Th>
        <Table.Td>{data.loggable_type.split('\\').pop()}</Table.Td>
      </Table.Tr>

      {data.old_data && (
        <Table.Tr>
          <Table.Th>{data.new_data && 'Old'} Data</Table.Th>
          <Table.Td>
            <Text component="pre" size="sm">
              {JSON.stringify(data.old_data, null, 2)}
            </Text>
          </Table.Td>
        </Table.Tr>
      )}

      {data.new_data && (
        <Table.Tr>
          <Table.Th>{data.old_data && 'New'} Data</Table.Th>
          <Table.Td>
            <Text component="pre" size="sm">
              {JSON.stringify(data.new_data, null, 2)}
            </Text>
          </Table.Td>
        </Table.Tr>
      )}
    </Table.Tbody>
  </Table>
)

export default ViewLog
