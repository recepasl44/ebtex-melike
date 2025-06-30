export interface data {
  branch: string
  branch_id: number
  contract_type_id: number
  profession_id: number
  full_name: string
  contract_type: number
  weekly_workdays: number
  weekly_lessons_count: number
  monthly_count: number
  salary: string
  lesson_rate: string
  question_rate: string
  daily_rate: string
  private_lesson_rate: string
  coaching_rate: string
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

export interface ListContractEmployeesResponse {
  data: data[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: meta
}

export interface ContractEmployeeListArg {
  enabled?: boolean
  [key: string]: any
}
