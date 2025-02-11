import type { Metadata } from 'next'

import AssetList from './list'
import { getAssets } from '@actions/assets'

type Props = {
  searchParams: Promise<{
    page: number
    limit: number
    search: string
  }>
}

export const metadata: Metadata = {
  title: 'Assets'
}

const Assets = async (props: Props) => {
  const { limit, page, search } = await props.searchParams
  const data = await getAssets(page, limit, search)

  return <AssetList data={data} />
}

export default Assets
