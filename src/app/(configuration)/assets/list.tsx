'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ActionIcon, Alert, Container, Group, Menu, Paper, Table, Text, TextInput, Tooltip } from '@mantine/core'
import { openConfirmModal, openModal } from '@mantine/modals'
import { useDebouncedValue } from '@mantine/hooks'
import { IoMdAdd as AddIcon, IoIosMore as MoreIcon } from 'react-icons/io'
import { FiSearch as SearchIcon } from 'react-icons/fi'

import AddAsset from './add'
import EditAsset from './edit'
import TitleBar from '@components/common/title-bar'
import TableNav from '@components/common/table-nav'
import useNavigation from '@hooks/useNavigation'
import { deleteAsset } from '@actions/assets'
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

  const addAssetHandler = () =>
    openModal({
      title: 'Add New Asset',
      children: <AddAsset />,
      centered: true
    })

  const editAssetHandler = (asset: TAsset) =>
    openModal({
      title: 'Edit Asset',
      children: <EditAsset initialData={asset} />,
      centered: true
    })

  const deleteHandler = (id: string) =>
    openConfirmModal({
      title: 'Delete asset',
      children: <Text size="sm">Do you really want to delete this asset?</Text>,
      centered: true,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      onConfirm: async () => await deleteAsset(id)
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

          <Tooltip label="Add New Asset" withArrow position="bottom">
            <ActionIcon onClick={addAssetHandler}>
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
                  <Table.Th>Remarks</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data.map((datum, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{datum.name}</Table.Td>
                    <Table.Td>{datum.remarks}</Table.Td>

                    <Table.Td>
                      <Menu withArrow>
                        <Menu.Target>
                          <ActionIcon variant="subtle" size="sm">
                            <MoreIcon />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item onClick={() => editAssetHandler(datum)}>Edit</Menu.Item>
                          <Menu.Item onClick={() => deleteHandler(datum._id)}>Delete</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
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
