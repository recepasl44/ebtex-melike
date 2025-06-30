import EmployeeEarningsMonthListStatus from '../../enums/employeeEarningsMonth/list'

export interface EmployeeEarningsMonthItem {
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

export interface EmployeeEarningsMonthData {
  employee_id: number
  first_name: string | null
  last_name: string | null
  branch_id: number | null
  profession_id: number | null
  branch: string | null
  profession: string | null
  items: EmployeeEarningsMonthItem[]
}

export interface ILink {
  url: string | null
  label: string
  active: boolean
}

export interface EmployeeEarningsMonthListResponse {
  data: EmployeeEarningsMonthData[]
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

export interface EmployeeEarningsMonthListState {
  data: EmployeeEarningsMonthData[] | null
  status: EmployeeEarningsMonthListStatus
  error: string | null
}

export interface EmployeeEarningsMonthListArgs {
  enabled?: boolean
  [key: string]: any
}
