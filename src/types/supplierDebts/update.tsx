import { SupplierDebtData } from './list'
import SupplierDebtsListStatus from '../../enums/supplierDebts/list'

export interface SupplierDebtsUpdatePayload {
  supplierId: number
  supplierDebtId: number
  payload: {
    branch_id?: number | null
    seasson_id?: number | null
    expense_category_id?: number | null
    payment_method_id?: number | null
    amount?: string
    due_date?: string
    description?: string
  }
}

export interface SupplierDebtsUpdateState {
  data: SupplierDebtData | null
  status: SupplierDebtsListStatus
  error: string | null
}
