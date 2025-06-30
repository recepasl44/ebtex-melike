import { EmployeeEarningsMonthData } from './list'
import EmployeeEarningsMonthListStatus from '../../enums/employeeEarningsMonth/list'

export interface EmployeeEarningsMonthShowState {
  data: EmployeeEarningsMonthData | null
  status: EmployeeEarningsMonthListStatus
  error: string | null
}
