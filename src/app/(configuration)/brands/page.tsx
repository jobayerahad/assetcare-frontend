import type { Metadata } from 'next'

import BrandList from './list'
import { getBrands } from '@actions/brands'
import { SearchParams } from '@types'

type Props = {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: 'Brands'
}

const Brands = async (props: Props) => {
  const searchParams = await props.searchParams
  const data = await getBrands(searchParams)

  return <BrandList data={data} />
}

export default Brands
