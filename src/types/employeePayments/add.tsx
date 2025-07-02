import { EmployeePaymentItem } from './list'
import EmployeePaymentListStatus from '../../enums/employeePayments/list'

export interface EmployeePaymentAddPayload {
  id: number
  employee_id: number
  period: string
  payment_type: string
  payment_date: string
  payment_method: string
  bank_name: string
  amount: string
  created_at: string
  updated_at: string
}

export interface EmployeePaymentAddState {
  data: EmployeePaymentItem | null
  status: EmployeePaymentListStatus
  error: string | null
}
