import { EmployeeEarningsMonthData } from './list'
import EmployeeEarningsMonthListStatus from '../../enums/employeeEarningsMonth/list'

export interface EmployeeEarningsMonthUpdatePayload {
  id: number
  payload: {
    employee_id?: number
    period?: string
    income_type?: string
    quantity?: string
    unit_price?: string
    total?: string
    platform_id?: number | null
  }
}

export interface EmployeeEarningsMonthUpdateState {
  data: EmployeeEarningsMonthData | null
  status: EmployeeEarningsMonthListStatus
  error: string | null
}
