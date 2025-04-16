import type { Metadata } from 'next'

import CategoryList from './list'
import { getCategories } from '@actions/categories'
import { SearchParams } from '@types'

type Props = {
  searchParams: Promise<SearchParams>
}

export const metadata: Metadata = {
  title: 'Categories'
}

const Categories = async (props: Props) => {
  const params = await props.searchParams
  const data = await getCategories(params)

  return <CategoryList data={data} />
}

export default Categories
