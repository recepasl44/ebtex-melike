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
  period: any
  total(total: any): unknown
  income_type: any
  quantity(quantity: any): unknown
  unit_price(unit_price: any): unknown
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

export interface EmployeeEarningsMonthMeta {
  total: number
  last_page: number
  current_page: number
}

export interface EmployeeEarningsMonthListResponse {
  rows: EmployeeEarningsMonthData[]
  meta: EmployeeEarningsMonthMeta
}

export interface EmployeeEarningsMonthListState {
  rows: EmployeeEarningsMonthData[] | null
  meta: EmployeeEarningsMonthMeta | null
  status: EmployeeEarningsMonthListStatus
  error: string | null
}

export interface EmployeeEarningsMonthListArgs {
  enabled?: boolean
  [key: string]: any
}
