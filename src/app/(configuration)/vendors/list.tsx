'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  ActionIcon,
  Alert,
  Box,
  Container,
  Group,
  Menu,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
  Title,
  Tooltip
} from '@mantine/core'
import { openConfirmModal, openModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useDebouncedValue } from '@mantine/hooks'
import { IoMdAdd as AddIcon, IoIosMore as MoreIcon } from 'react-icons/io'
import { FiSearch as SearchIcon } from 'react-icons/fi'
import { MdDeleteOutline as DeleteIcon, MdEdit as EditIcon } from 'react-icons/md'

import VendorForm from './form'
import TitleBar from '@components/common/title-bar'
import TableNav from '@components/common/table-nav'
import useNavigation from '@hooks/useNavigation'
import { deleteVendor } from '@actions/vendors'
import { getMessage } from '@utils/notification'
import { TVendor, PaginationResponse } from '@types'

type Props = {
  data: PaginationResponse<TVendor>
}

const VendorList = ({ data: { data, meta } }: Props) => {
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
      title: 'Add New Vendor',
      children: <VendorForm />,
      size: 'lg',
      closeOnClickOutside: false,
      centered: true
    })

  const editHandler = (id: number, data: Partial<TVendor>) =>
    openModal({
      title: 'Edit Vendor',
      children: <VendorForm vendorId={id} initialValues={data} />,
      size: 'lg',
      closeOnClickOutside: false,
      centered: true
    })

  const deleteHandler = (id: number) =>
    openConfirmModal({
      title: 'Delete This Vendor?',
      children: (
        <Text size="sm">
          Are you sure you want to delete this vendor? This action is destructive and can't reverse.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red', variant: 'filled' },
      onConfirm: async () => {
        const res = await deleteVendor(id)
        showNotification(getMessage(res))
      },
      centered: true
    })

  useEffect(() => {
    navigate({ search, page: '1' })
  }, [search])

  return (
    <Container>
      <Group justify="space-between" mb="xs">
        <TitleBar title="Vendor List" url="/" />

        <Group gap="xs">
          <TextInput
            placeholder="Search here..."
            value={interSearch}
            onChange={(event) => setInterSearch(event.currentTarget.value)}
            leftSection={<SearchIcon />}
            miw={250}
            size="xs"
          />

          <Tooltip label="Add Vendor" withArrow position="bottom">
            <ActionIcon onClick={addHandler}>
              <AddIcon />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      {meta.total > 0 ? (
        <>
          <SimpleGrid cols={2} spacing="xs" mb="xs">
            {data.map(({ name, description, id }, index) => (
              <Paper shadow="xs" p="sm" pos="relative" key={index}>
                <Title order={4} mb={4}>
                  {name}
                </Title>

                <Text size="sm">Description: {description ?? 'N/A'}</Text>

                <Box pos="absolute" top={10} right={10}>
                  <Menu shadow="md" withArrow>
                    <Menu.Target>
                      <ActionIcon variant="outline" size="sm">
                        <MoreIcon />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item leftSection={<EditIcon />} onClick={() => editHandler(id, { name, description })}>
                        Edit
                      </Menu.Item>

                      <Menu.Item color="red" leftSection={<DeleteIcon />} onClick={() => deleteHandler(id)}>
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Box>
              </Paper>
            ))}
          </SimpleGrid>

          <TableNav
            listName="vendors"
            limit={limit}
            limitHandler={handleLimitChange}
            page={page}
            pageHandler={handlePageChange}
            totalPages={meta.last_page}
            totalRecords={meta.total}
          />
        </>
      ) : (
        <Alert title="No vendors found">Once any vendor added, the list will appear here.</Alert>
      )}
    </Container>
  )
}

export default VendorList
