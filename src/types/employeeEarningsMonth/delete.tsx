import { EmployeeEarningsMonthData } from './list'
import EmployeeEarningsMonthListStatus from '../../enums/employeeEarningsMonth/list'

export interface EmployeeEarningsMonthDeletePayload {
  id: number
}

export interface EmployeeEarningsMonthDeleteState {
  data: EmployeeEarningsMonthData | null
  status: EmployeeEarningsMonthListStatus
  error: string | null
}
