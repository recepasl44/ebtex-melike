import { SupplierDebtData } from './list'
import SupplierDebtsListStatus from '../../enums/supplierDebts/list'

export interface SupplierDebtsDetailState {
  data: SupplierDebtData | null
  status: SupplierDebtsListStatus
  error: string | null
}
