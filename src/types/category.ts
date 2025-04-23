export type TCategory = {
  id: number
  name: string
  description: string
  created_at: Date
  updated_at: Date
}

export type TCategoryParams = {
  per_page: number
  page: number
}
