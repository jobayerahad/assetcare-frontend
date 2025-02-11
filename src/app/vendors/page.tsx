import type { Metadata } from 'next'

import VendorList from './list'
import { getVendors } from '@actions/vendors'

type Props = {
  searchParams: Promise<{
    page: number
    limit: number
    search: string
  }>
}

export const metadata: Metadata = {
  title: 'Vendors'
}

const Vendors = async (props: Props) => {
  const { limit, page, search } = await props.searchParams
  const data = await getVendors(page, limit, search)

  return <VendorList data={data} />
}

export default Vendors
