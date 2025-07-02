import EmployeePaymentListStatus from '../../enums/employeePayments/list'

export interface EmployeePaymentItem {
  id: number
  employee_id: number
  period: string
  payment_type: string
  payment_date: string
  payment_method: string
  bank_name: string
  amount: string
  created_at: string
  updated_at: string
}

export interface ContractEmployee {
  id: number
  employee_id: number
  branch_id: number
  contract_type_id: number
  profession_id: number
  weekly_workdays: number
  weekly_lessons_count: number
  monthly_count: number
  salary: string
  lesson_rate: string
  question_rate: string
  daily_rate: string
  private_lesson_rate: string
  coaching_rate: string
  platform_id: number
  created_at: string | null
  updated_at: string | null
  contract_type: any
}

export interface Employee {
  id: number
  full_name: string
  identification_no: string
  birth_day: string
  type_id: number
  email: string
  phone_number: string
  address: string
  gender_id: number
  status: number
  created_at: string | null
  updated_at: string | null
  platform_id: number
  branch: any
  contract_employee: ContractEmployee | null
}

export interface EmployeePaymentData {
  employee_id: number
  employee: Employee | null
  total_amount: number
  items: EmployeePaymentItem[]
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

export interface EmployeePaymentListResponse {
  data: EmployeePaymentData[]
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

export interface EmployeePaymentListState {
  data: EmployeePaymentData[] | null
  meta: PaginationMeta | null
  status: EmployeePaymentListStatus
  error: string | null
}

export interface EmployeePaymentListArg {
  enabled?: boolean
  [key: string]: any
}
