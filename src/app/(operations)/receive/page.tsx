import type { Metadata } from 'next'

import AssetReceiveForm from './form'
import { getAllCategory } from '@actions/categories'
import { getSessionUser } from '@utils/authorization'
import { getBranches, getDivisions } from '@actions/locations'
import { getAllVendors } from '@actions/vendors'

export const metadata: Metadata = {
  title: 'Receive Asset'
}

const ReceiveAsset = async () => {
  const user = await getSessionUser()

  const [categories, branches, divisions, vendors] = await Promise.all([
    getAllCategory(),
    getBranches(),
    getDivisions(),
    getAllVendors()
  ])

  return (
    <AssetReceiveForm categories={categories} user={user} branches={branches} divisions={divisions} vendors={vendors} />
  )
}

export default ReceiveAsset
