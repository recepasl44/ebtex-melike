import { SupplierDebtData } from './list'
import SupplierDebtsListStatus from '../../enums/supplierDebts/list'

export interface SupplierDebtsDeletePayload {
  id?: number
}

export interface SupplierDebtsDeleteState {
  data: SupplierDebtData | null
  status: SupplierDebtsListStatus
  error: string | null
}
