import type { Metadata } from 'next'

import ProductForm from './form'
import { getAllCategory } from '@actions/categories'

export const metadata: Metadata = {
  title: 'Products'
}

const Products = async () => {
  const categories = await getAllCategory()

  return <ProductForm categories={categories.data} />
}

export default Products
