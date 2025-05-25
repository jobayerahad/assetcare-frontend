'use client'

import pluralize from 'pluralize'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ActionIcon, Alert, Container, Group, Menu, Paper, Table, Text, TextInput, Tooltip } from '@mantine/core'
import { openConfirmModal, openModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useDebouncedValue } from '@mantine/hooks'
import { IoMdAdd as AddIcon, IoIosMore as MoreIcon } from 'react-icons/io'
import { FiSearch as SearchIcon } from 'react-icons/fi'
import { MdDeleteOutline as DeleteIcon, MdEdit as EditIcon } from 'react-icons/md'

import AssetForm from './form'
import TitleBar from '@components/common/title-bar'
import TableNav from '@components/common/table-nav'
import useNavigation from '@hooks/useNavigation'
import { deleteAsset } from '@actions/assets'
import { getMessage } from '@utils/notification'
import { PaginationResponse, TAsset, TAssetForm, TBranch, TCategory, TDivision, TVendor } from '@types'

type Props = {
  data: PaginationResponse<TAsset>
  branches: TBranch[]
  divisions: TDivision[]
  categories: TCategory[]
}

const AssetList = ({ data: { data, meta }, branches, divisions, categories }: Props) => {
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
      title: 'Add New Asset',
      children: <AssetForm branches={branches} divisions={divisions} categories={categories} />,
      size: 'lg',
      closeOnClickOutside: false,
      centered: true
    })

  const editHandler = (id: number, data: TAssetForm) =>
    openModal({
      title: 'Edit Asset',
      children: (
        <AssetForm
          assetId={id}
          initialValues={data}
          branches={branches}
          divisions={divisions}
          categories={categories}
        />
      ),
      size: 'lg',
      closeOnClickOutside: false,
      centered: true
    })

  const deleteHandler = (id: number) =>
    openConfirmModal({
      title: 'Delete This Asset?',
      children: (
        <Text size="sm">Are you sure you want to delete this asset? This action is destructive and can't reverse.</Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red', variant: 'filled' },
      onConfirm: async () => {
        const res = await deleteAsset(id)
        showNotification(getMessage(res))
      },
      centered: true
    })

  useEffect(() => {
    const currentSearch = searchParams.get('search') || ''
    if (search !== currentSearch) navigate({ search, page: '1' })
  }, [search])

  return (
    <Container size="lg">
      <Group justify="space-between" mb="xs">
        <TitleBar title="Asset List" />

        <Group gap="xs">
          <TextInput
            placeholder="Search here..."
            value={interSearch}
            onChange={(event) => setInterSearch(event.currentTarget.value)}
            leftSection={<SearchIcon />}
            miw={300}
          />

          <Tooltip label="Add Asset" withArrow position="bottom">
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
                  <Table.Th>Branch/Division</Table.Th>
                  <Table.Th>Product</Table.Th>
                  <Table.Th>Brand</Table.Th>
                  <Table.Th>Model</Table.Th>
                  <Table.Th>Serial No.</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data.map((item, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{item.branch.code === '0001' ? item.division.name : item.branch.name}</Table.Td>
                    <Table.Td>{item.product?.name}</Table.Td>
                    <Table.Td>{item.brand}</Table.Td>
                    <Table.Td>{item.model}</Table.Td>
                    <Table.Td>{item.serial_number}</Table.Td>

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
                              editHandler(item.id, {
                                branch_id: item.branch_id.toString(),
                                division_id: item.division_id.toString(),
                                product_id: item.product_id.toString(),
                                category: item.product?.category?.id.toString(),
                                brand: item.brand,
                                model: item.model,
                                serial_number: item.serial_number,
                                status: item.status,
                                current_location_type: item.current_location_type,
                                current_location_id: item.current_location_id.toString(),
                                remarks: item.remarks
                              })
                            }
                          >
                            Edit
                          </Menu.Item>

                          <Menu.Item color="red" leftSection={<DeleteIcon />} onClick={() => deleteHandler(item.id)}>
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
        <Alert title="No assets found">Once any asset added, the list will appear here.</Alert>
      )}
    </Container>
  )
}

export default AssetList
