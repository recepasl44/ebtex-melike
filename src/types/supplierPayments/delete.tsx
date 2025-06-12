import { SupplierPaymentData } from './list'
import SupplierPaymentsListStatus from '../../enums/supplierPayments/list'

export interface SupplierPaymentsDeletePayload {
  id?: number
}

export interface SupplierPaymentsDeleteState {
  data: SupplierPaymentData | null
  status: SupplierPaymentsListStatus
  error: string | null
}
