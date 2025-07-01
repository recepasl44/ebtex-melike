import EmployeeEarningsPeriodListStatus from '../../enums/employeeEarningsPeriod/list'

export interface EmployeeEarningsPeriodItem {
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

export interface EmployeeEarningsPeriodData {
  employee_id: number
  first_name: string | null
  last_name: string | null
  branch_id: number | null
  profession_id: number | null
  branch: string | null
  profession: string | null
  items: EmployeeEarningsPeriodItem[]
}

export interface ILink {
  url: string | null
  label: string
  active: boolean
}

export interface PaginationMeta {
  current_page: number
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
  links: ILink[]
}

export interface EmployeeEarningsPeriodListResponse {
  data: EmployeeEarningsPeriodData[]
  current_page: number
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: ILink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export interface EmployeeEarningsPeriodListState {
  data: EmployeeEarningsPeriodData[] | null
  meta: PaginationMeta | null
  status: EmployeeEarningsPeriodListStatus
  error: string | null
}

export interface EmployeeEarningsPeriodListArgs {
  enabled?: boolean
  [key: string]: any
}
