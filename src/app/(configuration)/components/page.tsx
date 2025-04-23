import type { Metadata } from 'next'

import ComponentForm from './form'
import { getAllCategory } from '@actions/categories'

export const metadata: Metadata = {
  title: 'Components'
}

const Components = async () => {
  const categories = await getAllCategory()

  return <ComponentForm categories={categories.data} />
}

export default Components
