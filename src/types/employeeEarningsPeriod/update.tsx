import { EmployeeEarningsPeriodData } from './list'
import EmployeeEarningsPeriodListStatus from '../../enums/employeeEarningsPeriod/list'

export interface EmployeeEarningsPeriodUpdatePayload {
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

export interface EmployeeEarningsPeriodUpdateState {
  data: EmployeeEarningsPeriodData | null
  status: EmployeeEarningsPeriodListStatus
  error: string | null
}
