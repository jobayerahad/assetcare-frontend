import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import CategoryList from './list'
import { getCategories } from '@actions/categories'
import { TCategoryParams } from '@types'

type Props = {
  searchParams: Promise<TCategoryParams>
}

export const metadata: Metadata = {
  title: 'Categories'
}

const Categories = async (props: Props) => {
  const params = await props.searchParams
  const data = await getCategories(params)

  if (!data) notFound()

  return <CategoryList data={data} />
}

export default Categories
