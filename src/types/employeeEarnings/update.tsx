import { data } from './list'
import EmployeeEarningsListStatus from '../../enums/employeeEarnings/list'

export interface EmployeeEarningsUpdatePayload {
  employeeId: number
  payload: {
    employee_id?: number
    period?: string
    income_type?: string
    quantity?: string
    unit_price?: string
    total?: string
    created_at?: string
    updated_at?: string
    platform_id?: number | null
  }
}

export interface EmployeeEarningsUpdateState {
  data: data | null
  status: EmployeeEarningsListStatus
  error: string | null
}
