'use client'

import {
  ActionIcon,
  Badge,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Table,
  Text,
  Textarea,
  Title
} from '@mantine/core'
import { VscDebugStart as StartIcon } from 'react-icons/vsc'
import { closeAllModals } from '@mantine/modals'
import { SiScrapy as ScrapIcon } from 'react-icons/si'
import { IoIosMore as MoreIcon, IoIosSend as SendIcon } from 'react-icons/io'

import { getAssetStatus } from '@utils/helpers'
import { TAssetMaintenance } from '@types'
import TitleBar from '@components/common/title-bar'

type Props = {
  data: TAssetMaintenance
}

const MaintenanceDetailUI = ({ data }: Props) => {
  return (
    <Container>
      <Group justify="space-between" mb={8}>
        <TitleBar title={`Maintenance ID: ${data.id}`} />

        <Badge variant="light" color={getAssetStatus(data.status).color}>
          {getAssetStatus(data.status).label}
        </Badge>
      </Group>

      <Group justify="space-between" mb="sm">
        <Text size="sm">
          <strong>Belongs To: </strong>
          {data.branch?.code === '0001' ? data.division?.name : `${data.branch?.name} (${data.branch?.code})`}
        </Text>

        <Text size="sm">
          <strong>On Repair: </strong>
          {new Date(data.created_at).toLocaleString('en-BD', { dateStyle: 'medium', timeStyle: 'medium' })}
        </Text>
      </Group>

      <Paper shadow="xs" p="sm" mb="xs">
        <Title order={5}>Asset Details</Title>
        <Divider mb="xs" />

        <Table withTableBorder withColumnBorders striped>
          <Table.Tbody>
            {[
              { title: 'Category', value: data?.asset?.product?.category?.name },
              { title: 'Asset', value: data?.asset?.product?.name },
              { title: 'Brand', value: data?.asset?.brand },
              { title: 'Model', value: data?.asset?.model },
              { title: 'Serial Number', value: data?.asset?.serial_number }
            ].map(({ title, value }, index) => (
              <Table.Tr key={index}>
                <Table.Th w="30%">{title}</Table.Th>
                <Table.Td>{value}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      {['in_progress', 'repaired', 'returned_to_branch'].includes(data.status) && (
        <Paper shadow="xs" p="sm" mb="xs">
          <Textarea label="Diagnosis Details" rows={4} value={data.diagnosis_details || 'N/A'} readOnly />
        </Paper>
      )}

      {['repaired', 'returned_to_branch'].includes(data.status) && (
        <Textarea label="Repair Details" rows={3} value={data.repair_details || 'N/A'} mb="sm" readOnly />
      )}
    </Container>
  )
}

export default MaintenanceDetailUI
