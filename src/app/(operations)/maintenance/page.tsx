import type { Metadata } from 'next'

import AssetList from './list'
import { getAllCategory } from '@actions/categories'
import { getAssetMaintenances } from '@actions/maintenance'
import { getBranches, getDivisions } from '@actions/locations'
import { getAllVendors } from '@actions/vendors'
import { AssetSearchParams } from '@types'

type Props = {
  searchParams: Promise<AssetSearchParams>
}

export const metadata: Metadata = {
  title: 'Asset Maintenance'
}

const AssetMaintenance = async (props: Props) => {
  const params = await props.searchParams

  const [data, branches, divisions, vendors, categories] = await Promise.all([
    getAssetMaintenances(params),
    getBranches(),
    getDivisions(),
    getAllVendors(),
    getAllCategory()
  ])

  return <AssetList data={data} branches={branches} divisions={divisions} vendors={vendors} categories={categories} />
}

export default AssetMaintenance
