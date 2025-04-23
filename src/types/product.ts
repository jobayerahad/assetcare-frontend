import { TCategory } from './category'

export type TProductForm = {
  name: string
  description: string
  category: string | null
}

export type TProduct = {
  id: number
  name: string
  description: string
  category_id: number
  category: TCategory
  created_at: Date
  updated_at: Date
}

export type TComponentForm = {
  name: string
  description: string
  category: string | null
  product: string | null
}

export type TComponent = {
  id: number
  name: string
  description: string
  product_id: number
  product: TProduct
  created_at: Date
  updated_at: Date
}
