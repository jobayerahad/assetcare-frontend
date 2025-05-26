import type { Metadata } from 'next'

import AssetItems from './list'
import { getAllCategory } from '@actions/categories'
import { getAllBrands } from '@actions/brands'
import { getItems } from '@actions/items'
import { SearchParams } from '@types'

type Props = {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: 'Asset Item'
}

const AssetItem = async (props: Props) => {
  const params = await props.searchParams

  const [data, categories, brands] = await Promise.all([getItems(params), getAllCategory(), getAllBrands()])

  return <AssetItems data={data} brands={brands} categories={categories} />
}

export default AssetItem
