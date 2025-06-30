import { data } from './list'
import EmployeeEarningsListStatus from '../../enums/employeeEarnings/list'

export interface EmployeeEarningsDeletePayload {
  id?: number
}

export interface EmployeeEarningsDeleteState {
  data: data | null
  status: EmployeeEarningsListStatus
  error: string | null
}
