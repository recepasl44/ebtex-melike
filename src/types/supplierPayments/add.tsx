import { SupplierPaymentData } from './list'
import SupplierPaymentsListStatus from '../../enums/supplierPayments/list'

export interface SupplierPaymentsAddPayload {
  id: number
  supplier_id: number
  amount: string
  payment_date: string
  description?: string
  is_paid?: number
  due_date?: string | null
  pdf_path?: string | null
  platform_id?: number
  payment_method_id?: number | null
  season_id?: number | null
  payment_method?: any
}

export interface SupplierPaymentsAddState {
  data: SupplierPaymentData | null
  status: SupplierPaymentsListStatus
  error: string | null
}
