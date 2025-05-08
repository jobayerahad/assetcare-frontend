import { TBranch, TDivision } from './location'
import { TProduct } from './product'

export type TAssetForm = {
  branch_id: string | null
  division_id: string | null
  category: string | null
  product_id: string | null
  model: string
  serial_number: string
  current_location_type: 'branch' | 'division' | 'vendor' | string
  current_location_id: string | null
  remarks: string
  status: 'active' | 'under_repair' | 'scrapped'
}

export type TAssetTransferForm = {
  asset_id: string | null
  from_location_type: 'branch' | 'division' | 'vendor'
  from_location_id: string | null
  to_location_type: 'branch' | 'division' | 'vendor'
  to_location_id: string | null
  transfer_type: 'sent_for_repair' | 'returned_after_repair'
  transfer_date: Date | string | null
  received_by: string
  category: string | null
  product: string | null
  remarks: string
}

export type TAsset = {
  id: number
  branch_id: number
  division_id: number
  product_id: number
  model: string
  serial_number: string
  status: 'active' | 'under_repair' | 'scrapped'
  current_location_type: 'branch' | 'division' | 'vendor'
  current_location_id: number
  remarks: string
  branch: TBranch
  division: TDivision
  product: TProduct
  created_at: Date
  updated_at: Date
}
