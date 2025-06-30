export interface data {
  id: number
  employee_id: number
  period: string
  income_type: string
  quantity: string
  unit_price: string
  total: string
  created_at: string
  updated_at: string
  platform_id: number | null
}

export interface meta {
  current_page: number
  from: number
  last_page: number
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface ListEmployeeEarningsResponse {
  data: data[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: meta
}

export interface EarningListArg {
  enabled?: boolean
  [key: string]: any
}
