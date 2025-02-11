import type { Metadata } from 'next'

import RepairCostList from './list'
import { getRepairCosts } from '@actions/repair-costs'

type Props = {
  searchParams: Promise<{
    page: number
    limit: number
    search: string
  }>
}

export const metadata: Metadata = {
  title: 'Repair Costs'
}

const RepairCosts = async (props: Props) => {
  const { limit, page, search } = await props.searchParams
  const data = await getRepairCosts(page, limit, search)

  return <RepairCostList data={data} />
}

export default RepairCosts
