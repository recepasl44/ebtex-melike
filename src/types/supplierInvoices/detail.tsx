import { SupplierInvoiceData } from './list'
import SupplierInvoicesListStatus from '../../enums/supplierInvoices/list'

export interface SupplierInvoicesDetailState {
  data: SupplierInvoiceData | null
  status: SupplierInvoicesListStatus
  error: string | null
}
