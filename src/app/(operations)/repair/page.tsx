import type { Metadata } from 'next'

import AssetRepairForm from './form'
import { getAllCategory } from '@actions/categories'
import { getAllVendors } from '@actions/vendors'

export const metadata: Metadata = {
  title: 'Asset Repair'
}

const AssetRepair = async () => {
  const [categories, vendors] = await Promise.all([getAllCategory(), getAllVendors()])

  return <AssetRepairForm categories={categories} vendors={vendors} />
}

export default AssetRepair
