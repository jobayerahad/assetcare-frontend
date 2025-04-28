import type { Metadata } from 'next'

import LogList from './ui'
import { getLogFilters, getLogs } from '@actions/log'
import { LogSearchParams } from '@types'

type Props = {
  searchParams: Promise<LogSearchParams>
}

export const metadata: Metadata = {
  title: 'Logs'
}

const Logs = async (props: Props) => {
  const params = await props.searchParams
  const [data, filters] = await Promise.all([getLogs(params), getLogFilters()])

  return <LogList data={data} filters={filters} />
}

export default Logs
