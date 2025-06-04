import pluralize from 'pluralize'
import { useState } from 'react'
import { Group, NumberFormatter, Pagination, Paper, Table, Text, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { LiaSortSolid as SortIcon, LiaSortUpSolid as AscIcon, LiaSortDownSolid as DescIcon } from 'react-icons/lia'

import { TRepairHistory } from '@types'

type Props = {
  data: TRepairHistory[]
}

const columns: ColumnDef<TRepairHistory, any>[] = [
  {
    accessorKey: 'assetCode',
    header: '#',
    cell: ({ row: { index } }) => index + 1,
    enableGlobalFilter: false,
    enableSorting: false
  },
  {
    accessorKey: 'repair_date',
    header: 'Repair Date',
    cell: ({ getValue }) => new Date(getValue()).toLocaleString('en-BD', { dateStyle: 'medium' }),
    enableGlobalFilter: false
  },
  {
    accessorKey: 'asset',
    header: 'Asset',
    cell: ({ getValue }) => getValue()
  },
  {
    accessorKey: 'branch',
    header: 'Branch/Division',
    cell: ({ getValue, row: { original } }) => (original.division ? original.division : getValue())
  },
  {
    accessorKey: 'vendor',
    header: 'Vendor',
    cell: ({ getValue }) => getValue()
  },
  {
    accessorKey: 'repair_cost',
    header: 'Repair Cost',
    cell: ({ getValue }) => (
      <NumberFormatter
        suffix=" ৳"
        value={getValue() || 0}
        thousandSeparator
        thousandsGroupStyle="lakh"
        decimalScale={2}
        fixedDecimalScale
      />
    )
  },
  {
    accessorKey: 'repair_details',
    header: 'Repair Details',
    cell: ({ getValue }) => getValue(),
    enableSorting: false
  }
]

const RepairHistoryList = ({ data }: Props) => {
  const [search, setSearch] = useState('')
  const [globalFilter] = useDebouncedValue(search, 200)

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
      {data?.length > 0 ? (
        <>
          <TextInput
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            mb="xs"
          />

          <Paper shadow="xs">
            <Table striped highlightOnHover>
              <Table.Thead>
                {table.getHeaderGroups().map(({ id, headers }) => (
                  <Table.Tr key={id}>
                    {headers.map(({ id, column, getContext }) => (
                      <Table.Th
                        onClick={column.getToggleSortingHandler()}
                        style={{ cursor: column.getCanSort() ? 'pointer' : 'auto', userSelect: 'none' }}
                        key={id}
                      >
                        <Group gap={4}>
                          {flexRender(column.columnDef.header, getContext())}{' '}
                          {column.getCanSort() && !column.getIsSorted() && <SortIcon />}{' '}
                          {column.getIsSorted() === 'asc' && <AscIcon />}
                          {column.getIsSorted() === 'desc' && <DescIcon />}
                        </Group>
                      </Table.Th>
                    ))}
                  </Table.Tr>
                ))}
              </Table.Thead>

              <Table.Tbody>
                {table.getRowModel().rows.map((row) => (
                  <Table.Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Table.Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Td>
                    ))}
                  </Table.Tr>
                ))}
              </Table.Tbody>

              <Table.Tfoot>
                <Table.Tr>
                  <Table.Th colSpan={5}>Total</Table.Th>

                  <Table.Th>
                    <NumberFormatter
                      suffix=" ৳"
                      value={data.reduce((total, asset) => {
                        return total + +asset.repair_cost
                      }, 0)}
                      thousandSeparator
                      thousandsGroupStyle="lakh"
                      decimalScale={2}
                      fixedDecimalScale
                    />
                  </Table.Th>
                </Table.Tr>
              </Table.Tfoot>
            </Table>
          </Paper>

          <Group justify="space-between" mt="md">
            <Text size="xs">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </Text>

            <Pagination
              size="sm"
              onChange={(page) => {
                const pageNumber = Number(page) - 1 || 0
                table.setPageIndex(pageNumber)
              }}
              total={table.getPageCount()}
            />

            <Text size="xs">
              Total: {table.getRowCount()} {pluralize('asset reapir', table.getRowCount())}
            </Text>
          </Group>
        </>
      ) : (
        <Text size="sm">No repair history found!</Text>
      )}
    </>
  )
}

export default RepairHistoryList
