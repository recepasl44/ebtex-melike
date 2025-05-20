import { SupplierRefundData } from './list'
import SupplierRefundsListStatus from '../../enums/supplierRefunds/list'

export interface SupplierRefundsDetailState {
  data: SupplierRefundData | null
  status: SupplierRefundsListStatus
  error: string | null
}
