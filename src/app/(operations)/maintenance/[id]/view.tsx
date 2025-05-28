'use client'

import {
  ActionIcon,
  Badge,
  Container,
  Divider,
  Group,
  Paper,
  Table,
  Text,
  Textarea,
  Title,
  Tooltip
} from '@mantine/core'
import { openModal } from '@mantine/modals'
import { GiBroom as ScrapIcon } from 'react-icons/gi'
import { IoIosSend as SendIcon } from 'react-icons/io'
import { TbReportAnalytics as DiagnoseIcon } from 'react-icons/tb'

import TitleBar from '@components/common/title-bar'
import Diagnosis from './diagnosis'
import ScrapAsset from './scrap'
import ToVendor from './to-vendor'
import { getAssetStatus } from '@utils/helpers'
import { TAssetMaintenance, TVendor } from '@types'

type Props = {
  data: TAssetMaintenance
  vendors: TVendor[]
}

const MaintenanceDetailUI = ({ data, vendors }: Props) => {
  const diagnosisHandler = () =>
    openModal({
      title: 'Dignosis Report',
      children: <Diagnosis id={data.id} />,
      size: 'lg',
      centered: true
    })

  const scrapHandler = () =>
    openModal({
      title: 'Scrap Asset',
      children: <ScrapAsset id={data.asset_id} />,
      size: 'lg',
      centered: true
    })

  const toVendorHandler = () =>
    openModal({
      title: 'Send to Vendor',
      children: <ToVendor assetId={data.asset_id} repairId={data.id} vendors={vendors} />,
      size: 'lg',
      centered: true
    })

  return (
    <Container>
      <Group justify="space-between" mb="xs">
        <TitleBar title={`Maintenance ID: ${data.id}`} />

        <Group gap="xs">
          <Badge variant="light" color={getAssetStatus(data.status).color}>
            {getAssetStatus(data.status).label}
          </Badge>

          {data.status === 'pending' && (
            <Tooltip label="Dignosis Report" withArrow position="bottom">
              <ActionIcon onClick={() => diagnosisHandler()} size="sm" variant="filled" color="blue">
                <DiagnoseIcon />
              </ActionIcon>
            </Tooltip>
          )}

          {data.status === 'in_progress' && (
            <>
              {!data.vendor_id && (
                <Tooltip label="Send to Vendor" withArrow position="bottom">
                  <ActionIcon onClick={() => toVendorHandler()} variant="filled" color="blue" size="sm">
                    <SendIcon />
                  </ActionIcon>
                </Tooltip>
              )}

              <Tooltip label="Scrap Asset" withArrow position="bottom">
                <ActionIcon onClick={() => scrapHandler()} variant="filled" color="red" size="sm">
                  <ScrapIcon />
                </ActionIcon>
              </Tooltip>
            </>
          )}
        </Group>
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
              { title: 'Category', value: data?.asset?.item?.product?.category?.name },
              { title: 'Asset', value: data?.asset?.item?.product?.name },
              { title: 'Brand', value: data?.asset?.item?.brand?.name },
              { title: 'Model', value: data?.asset?.item?.model },
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
