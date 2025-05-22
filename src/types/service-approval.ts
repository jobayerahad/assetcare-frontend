import { TComponent } from './product'
import { SearchParams } from './utilities'
import { TVendor } from './vendor'

export type TServiceApprovalForm = {
  category: string | null
  product: string | null
  component: string | null
  vendor: string | null
  cost: string | number
  year: string | null
  description: string
  is_selected: boolean | string
}

export type TServiceApproval = {
  id: number
  component_id: number
  vendor_id: number
  cost: number
  year: number
  description: string
  is_selected: boolean
  created_at: Date
  updated_at: Date
  component: TComponent
  vendor: TVendor
}

export type ServiceApprovalSearchParams = SearchParams & {}
