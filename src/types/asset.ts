import { TBranch, TDivision } from './location'
import { TProduct } from './product'

export type TAssetForm = {
  branch_id: string | null
  division_id: string | null
  category: string | null
  product_id: string | null
  model: string
  serial_number: string
  current_location_type: 'Branch' | 'Division' | 'Vendor'
  current_location_id: string | null
  remarks: string
  status: 'active' | 'under_repair' | 'scrapped'
}

export type TAsset = {
  id: number
  branch_id: number
  division_id: number
  product_id: number
  model: string
  serial_number: string
  status: 'active' | 'under_repair' | 'scrapped'
  current_location_type: 'Branch' | 'Division' | 'Vendor'
  current_location_id: number
  remarks: string
  branch: TBranch
  division: TDivision
  product: TProduct
  created_at: Date
  updated_at: Date
}
