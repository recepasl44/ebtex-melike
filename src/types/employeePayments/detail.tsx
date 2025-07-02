import { EmployeePaymentItem } from './list'
import EmployeePaymentListStatus from '../../enums/employeePayments/list'

export interface EmployeePaymentShowState {
  data: EmployeePaymentItem | null
  status: EmployeePaymentListStatus
  error: string | null
}
