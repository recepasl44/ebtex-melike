import { SupplierPaymentData } from './list'
import SupplierPaymentsListStatus from '../../enums/supplierPayments/list'

export interface SupplierPaymentsDetailState {
  data: SupplierPaymentData | null
  status: SupplierPaymentsListStatus
  error: string | null
}
