import type { Metadata } from 'next'

import ProductForm from './form'
import { getAllCategory } from '@actions/categories'

export const metadata: Metadata = {
  title: 'Components'
}

const Components = async () => {
  const categories = await getAllCategory()

  return <ProductForm categories={categories.data} />
}

export default Components
