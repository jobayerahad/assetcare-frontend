import { TItem } from './item'
import { TBranch, TDivision } from './location'
import { SearchParams } from './utilities'
import { TVendor } from './vendor'

export type AssetStatus =
  | 'active'
  | 'under_repair'
  | 'pending'
  | 'in_progress'
  | 'repaired'
  | 'returned_to_branch'
  | 'scrapped'

export type TAssetForm = {
  branch_id: string | null
  division_id: string | null
  category: string | null
  product: string | null
  item_id: string | null
  serial_number: string
  current_location_type: 'branch' | 'division' | 'vendor' | string
  current_location_id: string | null
  remarks: string
  status: AssetStatus
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
  on_repair?: boolean
  remarks: string
}

export type TAsset = {
  id: number
  branch_id: number
  division_id: number
  item_id: number
  serial_number: string
  status: AssetStatus
  current_location_type: 'branch' | 'division' | 'vendor'
  current_location_id: number
  remarks: string
  branch: TBranch
  division: TDivision
  item: TItem
  created_at: Date
  updated_at: Date
}

export type TAssetMaintenance = {
  id: number
  asset_id: number
  branch_id: number
  vendor_id: number | null
  division_id: number | null
  repair_type: 'internal' | 'external'
  diagnosis_details: string | null
  repair_details: string | null
  status: 'pending' | 'in_progress' | 'repaired' | 'returned_to_branch' | 'scrapped'
  repair_cost: number
  repair_date: null
  created_at: Date
  updated_at: Date
  branch: TBranch
  division: TDivision | null
  vendor: TVendor | null
  asset: TAsset
}

export type AssetSearchParams = SearchParams & {
  status: AssetStatus
}

export type TFilteredAsset = {
  id: number
  serial_no: string
  model: string
  product: string
  brand: string
}
