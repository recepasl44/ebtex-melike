import { SupplierInvoiceData } from './list'
import SupplierInvoicesListStatus from '../../enums/supplierPayments/list'

export interface SupplierInvoicesDeletePayload {
  id?: number
}

export interface SupplierInvoicesDeleteState {
  data: SupplierInvoiceData | null
  status: SupplierInvoicesListStatus
  error: string | null
}
