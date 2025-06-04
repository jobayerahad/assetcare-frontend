'use client'

import { useState, useTransition } from 'react'
import { Button, Container, Divider, Group, Paper, Select, SimpleGrid } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { BiSearchAlt as SearchIcon } from 'react-icons/bi'

import TitleBar from '@components/common/title-bar'
import RepairHistoryList from './list'
import { getRepairReport } from '@actions/reports'
import { StatusMsg } from '@config/constants'
import { getMessage } from '@utils/notification'
import { TBranch, TDivision, TProduct, TRepairHistory, TRepairHistoryForm } from '@types'

type Props = {
  branches: TBranch[]
  divisions: TDivision[]
  products: TProduct[]
}

const RepairHistoryUI = ({ branches, divisions, products }: Props) => {
  const [isLoading, startTransition] = useTransition()
  const [data, setData] = useState<TRepairHistory[]>([])

  const { onSubmit, getInputProps, values, reset } = useForm<TRepairHistoryForm>({
    initialValues: {
      branch_id: null,
      division_id: null,
      product_id: null
    }
  })

  const isHeadOffice = values.branch_id && values.branch_id === '1'

  const submitHandler = (formData: TRepairHistoryForm) =>
    startTransition(async () => {
      const res = await getRepairReport({
        ...formData,
        division_id: formData.branch_id === '1' ? formData.division_id : null
      })

      showNotification(getMessage(res))
      if (res.status === StatusMsg.SUCCESS) {
        setData(res.data)
        reset()
      }
    })

  return (
    <Container size="xl">
      <TitleBar title="Repair History" />

      <Paper shadow="xs" p="sm" mt="xs" component="form" onSubmit={onSubmit(submitHandler)}>
        <Group gap="xs" align="flex-end">
          <SimpleGrid cols={isHeadOffice ? 3 : 2} spacing="xs" flex={1}>
            <Select
              label="Branch"
              placeholder="Select branch"
              data={branches.map(({ id, name, code }) => ({
                value: id.toString(),
                label: `${name} (${code})`
              }))}
              searchable
              {...getInputProps('branch_id')}
            />

            {isHeadOffice && (
              <Select
                label="Division"
                placeholder="Select division"
                data={divisions.map(({ id, name }) => ({
                  value: id.toString(),
                  label: name
                }))}
                searchable
                {...getInputProps('division_id')}
              />
            )}

            <Select
              label="Product"
              placeholder="Select product"
              data={products.map(({ id, name }) => ({
                value: id.toString(),
                label: name
              }))}
              searchable
              {...getInputProps('product_id')}
            />
          </SimpleGrid>

          <Button type="submit" leftSection={<SearchIcon />} loading={isLoading}>
            Search
          </Button>
        </Group>
      </Paper>

      {data.length > 0 && (
        <>
          <Divider variant="dashed" my="xs" />
          <RepairHistoryList data={data} />
        </>
      )}
    </Container>
  )
}

export default RepairHistoryUI
