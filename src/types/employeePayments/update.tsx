import { EmployeePaymentItem } from './list'
import EmployeePaymentListStatus from '../../enums/employeePayments/list'

export interface EmployeePaymentUpdatePayload {
  id: number
  payload: {
    employee_id?: number
    period?: string
    payment_type?: string
    payment_date?: string
    payment_method?: string
    bank_name?: string
    amount?: string
    created_at?: string
    updated_at?: string
  }
}

export interface EmployeePaymentUpdateState {
  data: EmployeePaymentItem | null
  status: EmployeePaymentListStatus
  error: string | null
}
