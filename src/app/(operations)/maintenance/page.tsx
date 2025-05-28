import type { Metadata } from 'next'

import AssetList from './list'
import { getAssetMaintenances } from '@actions/maintenance'
import { AssetSearchParams } from '@types'

type Props = {
  searchParams: Promise<AssetSearchParams>
}

export const metadata: Metadata = {
  title: 'Asset Maintenance'
}

const AssetMaintenance = async (props: Props) => {
  const params = await props.searchParams

  const data = await getAssetMaintenances(params)

  return <AssetList data={data} />
}

export default AssetMaintenance
