import { data } from './list'
import EmployeeEarningsListStatus from '../../enums/employeeEarnings/list'

export interface EmployeeEarningShowState {
  data: data | null
  status: EmployeeEarningsListStatus
  error: string | null
}
