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
}

export type TComponentForm = {
  name: string
  description: string
  category: string | null
  product: string | null
}
