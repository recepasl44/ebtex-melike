import { EmployeeEarningsPeriodData } from './list'
import EmployeeEarningsPeriodListStatus from '../../enums/employeeEarningsPeriod/list'

export interface EmployeeEarningsPeriodDeletePayload {
  id: number
}

export interface EmployeeEarningsPeriodDeleteState {
  data: EmployeeEarningsPeriodData | null
  status: EmployeeEarningsPeriodListStatus
  error: string | null
}
