import type { Metadata } from 'next'

import RepairHistoryUI from './ui'
import { getBranches, getDivisions } from '@actions/locations'
import { getAllProduct } from '@actions/products'

export const metadata: Metadata = {
  title: 'Repair History'
}

const RapairHistory = async () => {
  const [branches, divisions, products] = await Promise.all([getBranches(), getDivisions(), getAllProduct()])

  return <RepairHistoryUI branches={branches} divisions={divisions} products={products} />
}

export default RapairHistory
