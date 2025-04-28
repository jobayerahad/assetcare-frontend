export type LogSearchParams = {
  action: string
  model: string
  user_id: string
  start_date: string
  end_date: string
}

export type TLog = {
  id: number
  user_id: number
  action: string
  loggable_type: string
  loggable_id: number
  old_data: Record<string, any> | null
  new_data: Record<string, any> | null
  created_at: string // ISO DateTime string
  updated_at: string // ISO DateTime string
  user: {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
  }
}

export type TLogFiler = {
  users: {
    id: number
    name: string
  }[]
  models: string[]
  actions: string[]
}
