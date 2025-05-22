import type { Metadata } from 'next'

import AssetList from './list'
import { getAllCategory } from '@actions/categories'
import { getAssets } from '@actions/assets'
import { getBranches, getDivisions } from '@actions/locations'
import { getAllVendors } from '@actions/vendors'
import { AssetSearchParams } from '@types'

type Props = {
  searchParams: Promise<AssetSearchParams>
}

export const metadata: Metadata = {
  title: 'Assets'
}

const Assets = async (props: Props) => {
  const params = await props.searchParams

  const [data, branches, divisions, vendors, categories] = await Promise.all([
    getAssets({ ...params, status: 'active' }),
    getBranches(),
    getDivisions(),
    getAllVendors(),
    getAllCategory()
  ])

  return <AssetList data={data} branches={branches} divisions={divisions} categories={categories} />
}

export default Assets
