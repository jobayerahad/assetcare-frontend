import type { Metadata } from 'next'

import VendorList from './list'
import { getVendors } from '@actions/vendors'
import { SearchParams } from '@types'

type Props = {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: 'Vendors'
}

const Vendors = async (props: Props) => {
  const searchParams = await props.searchParams
  const data = await getVendors(searchParams)

  return <VendorList data={data} />
}

export default Vendors
