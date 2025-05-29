import type { Metadata } from 'next'

import AssetList from './list'
import { getAssetMaintenances } from '@actions/maintenance'
import { getBranches } from '@actions/locations'
import { AssetSearchParams } from '@types'

type Props = {
  searchParams: Promise<AssetSearchParams>
}

export const metadata: Metadata = {
  title: 'Asset Maintenance'
}

const AssetMaintenance = async (props: Props) => {
  const params = await props.searchParams

  const [data, branches] = await Promise.all([getAssetMaintenances(params), getBranches()])

  return <AssetList data={data} branches={branches} />
}

export default AssetMaintenance
