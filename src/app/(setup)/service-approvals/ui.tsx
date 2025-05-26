'use client'

import { useSearchParams } from 'next/navigation'
import {
  ActionIcon,
  Alert,
  Container,
  Group,
  Menu,
  NumberFormatter,
  Paper,
  Select,
  Table,
  Text,
  Tooltip
} from '@mantine/core'
import { openConfirmModal, openModal } from '@mantine/modals'
import { YearPickerInput } from '@mantine/dates'
import { showNotification } from '@mantine/notifications'
import { IoMdAdd as AddIcon, IoIosMore as MoreIcon } from 'react-icons/io'
import { MdDeleteOutline as DeleteIcon, MdEdit as EditIcon } from 'react-icons/md'

import TitleBar from '@components/common/title-bar'
import TableNav from '@components/common/table-nav'
import useNavigation from '@hooks/useNavigation'
import ServiceApprovalForm from './form'
import { deleteServiceApproval } from '@actions/service-approvals'
import { getMessage } from '@utils/notification'
import { PaginationResponse, TCategory, TServiceApproval, TServiceApprovalForm, TVendor } from '@types'

type Props = {
  data: PaginationResponse<TServiceApproval>
  categories: TCategory[]
  vendors: TVendor[]
}

const ServiceApprovalUI = ({ data: { data, meta }, categories, vendors }: Props) => {
  const searchParams = useSearchParams()!
  const { navigate } = useNavigation()

  const page = Number(searchParams.get('page')) || 1
  const limit = searchParams.get('per_page') || '10'
  const category = searchParams.get('category') || ''
  const vendor = searchParams.get('vendor') || ''
  const yearParam = searchParams.get('year')
  const year = yearParam ? new Date(Number(yearParam), 0, 1) : null

  const handlePageChange = (val: number) => navigate({ page: val.toString() })
  const handleLimitChange = (val: string | null) => navigate({ per_page: val! })
  const handleCatChange = (val: string | null) => navigate({ category: val! })
  const handleVendorChange = (val: string | null) => navigate({ vendor: val! })
  const handleYearChange = (val: string | null) => {
    if (val) navigate({ year: val?.substring(0, 4) })
    else navigate({ year: '' })
  }

  const addHandler = () =>
    openModal({
      title: 'Add New Service Approval',
      children: <ServiceApprovalForm categories={categories} vendors={vendors} />,
      size: 'xl',
      closeOnClickOutside: false,
      centered: true
    })

  const editHandler = (id: number, data: TServiceApprovalForm) =>
    openModal({
      title: 'Edit Service Approval',
      children: <ServiceApprovalForm categories={categories} vendors={vendors} approvalId={id} initialValues={data} />,
      size: 'xl',
      closeOnClickOutside: false,
      centered: true
    })

  const deleteHandler = (id: number) =>
    openConfirmModal({
      title: 'Delete This Service Approval?',
      children: (
        <Text size="sm">
          Are you sure you want to delete this service approval? This action is destructive and can't reverse.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red', variant: 'filled' },
      onConfirm: async () => {
        const res = await deleteServiceApproval(id)
        showNotification(getMessage(res))
      },
      centered: true
    })

  return (
    <Container size="xl">
      <Group justify="space-between" mb="xs">
        <TitleBar title="Service Approvals" />

        <Group gap="xs" align="flex-end">
          <Select
            label="Category"
            placeholder="Select category"
            data={categories.map(({ id, name }) => ({
              value: id.toString(),
              label: name
            }))}
            value={category}
            onChange={handleCatChange}
            size="xs"
            searchable
            w={170}
          />

          <Select
            label="Vendor"
            placeholder="Select vendor"
            data={vendors.map(({ id, name }) => ({
              value: id.toString(),
              label: name
            }))}
            value={vendor}
            onChange={handleVendorChange}
            size="xs"
            searchable
            w={170}
          />

          <YearPickerInput
            label="Year"
            placeholder="Select year"
            size="xs"
            minDate={new Date(2013, 0, 1)}
            maxDate={new Date(new Date().getFullYear(), 11, 31)}
            value={year}
            onChange={handleYearChange}
            allowDeselect
            w={170}
          />

          <Tooltip label="Add Service Approval" withArrow position="bottom">
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
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Product</Table.Th>
                  <Table.Th>Component</Table.Th>
                  <Table.Th>Vendor</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>Year</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data.map(
                  ({ id, component, vendor, year, cost, component_id, vendor_id, description, is_selected }, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>{index + 1}</Table.Td>
                      <Table.Td>{component?.product?.category?.name}</Table.Td>
                      <Table.Td>{component?.product?.name}</Table.Td>
                      <Table.Td>{component?.name}</Table.Td>
                      <Table.Td>{vendor?.name}</Table.Td>
                      <Table.Td>
                        <NumberFormatter thousandSeparator thousandsGroupStyle="lakh" value={cost} />
                      </Table.Td>
                      <Table.Td>{year}</Table.Td>

                      <Table.Td>
                        <Menu shadow="md" withArrow>
                          <Menu.Target>
                            <ActionIcon variant="subtle" size="sm">
                              <MoreIcon />
                            </ActionIcon>
                          </Menu.Target>

                          <Menu.Dropdown>
                            <Menu.Item
                              leftSection={<EditIcon />}
                              onClick={() =>
                                editHandler(id, {
                                  category: component?.product?.category?.id.toString(),
                                  component: component_id.toString(),
                                  cost,
                                  description,
                                  is_selected,
                                  product: component?.product?.id.toString(),
                                  vendor: vendor_id.toString(),
                                  year: year.toString()
                                })
                              }
                            >
                              Edit
                            </Menu.Item>

                            <Menu.Item color="red" leftSection={<DeleteIcon />} onClick={() => deleteHandler(id)}>
                              Delete
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Table.Td>
                    </Table.Tr>
                  )
                )}
              </Table.Tbody>
            </Table>
          </Paper>

          <TableNav
            listName="service approvals"
            limit={limit}
            limitHandler={handleLimitChange}
            page={page}
            pageHandler={handlePageChange}
            totalPages={meta.last_page}
            totalRecords={meta.total}
          />
        </>
      ) : (
        <Alert title="No service approvals found">Once any service approval added, the list will appear here.</Alert>
      )}
    </Container>
  )
}

export default ServiceApprovalUI
