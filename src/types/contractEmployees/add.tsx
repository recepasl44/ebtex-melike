import { data } from './list'
import { ContractEmployeesListStatus } from '../../enums/contractEmployees/list'

export interface ContractEmployeesAddPayload {
  id: number
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

export interface ContractEmployeesAddState {
  data: data | null
  status: ContractEmployeesListStatus
  error: string | null
}
