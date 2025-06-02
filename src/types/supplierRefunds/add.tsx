import { SupplierRefundData } from './list'
import SupplierRefundsListStatus from '../../enums/supplierRefunds/list'

export interface SupplierRefundsAddPayload {
  id: number
  supplier_id: number
  amount: string
  refund_date: string
  description?: string
  platform_id?: number
  refund_type?: string
  invoice_id?: number | null
  debt_id?: number | null
  payment_method_id?: number | null
}

export interface SupplierRefundsAddState {
  data: SupplierRefundData | null
  status: SupplierRefundsListStatus
  error: string | null
}
