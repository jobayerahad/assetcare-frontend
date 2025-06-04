export type TRepairHistoryForm = {
  branch_id: string | null
  division_id: string | null
  product_id: string | null
}

export type TRepairHistory = {
  asset: string
  brand: string
  model: string
  vendor: string
  branch: string
  division: null | string
  repair_date: Date
  repair_details: string
  repair_cost: number
}
