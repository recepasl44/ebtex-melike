import { EmployeePaymentItem } from './list'
import EmployeePaymentListStatus from '../../enums/employeePayments/list'

export interface EmployeePaymentDeletePayload {
  id?: number
}

export interface EmployeePaymentDeleteState {
  data: EmployeePaymentItem | null
  status: EmployeePaymentListStatus
  error: string | null
}
