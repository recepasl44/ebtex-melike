import { EmployeeEarningsPeriodData } from './list'
import EmployeeEarningsPeriodListStatus from '../../enums/employeeEarningsPeriod/list'

export interface EmployeeEarningsPeriodShowState {
  data: EmployeeEarningsPeriodData | null
  status: EmployeeEarningsPeriodListStatus
  error: string | null
}
