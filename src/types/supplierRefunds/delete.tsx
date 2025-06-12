import { SupplierRefundData } from './list'
import SupplierRefundsListStatus from '../../enums/supplierRefunds/list'

export interface SupplierRefundsDeletePayload {
  id?: number
}

export interface SupplierRefundsDeleteState {
  data: SupplierRefundData | null
  status: SupplierRefundsListStatus
  error: string | null
}
