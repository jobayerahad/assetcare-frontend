import { TBrand } from './brand'
import { TProduct } from './product'

export type TAssetItemForm = {
  category: string | null
  product_id: string | null
  brand_id: string | null
  model: string
  remarks: string
}

export type TItem = {
  id: number
  brand_id: number
  product_id: number
  model: string
  remarks: string
  created_at: Date
  updated_at: Date
  brand: TBrand
  product: TProduct
}
