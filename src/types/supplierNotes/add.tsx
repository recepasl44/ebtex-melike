import { SupplierNoteData } from './list'
import SupplierNotesListStatus from '../../enums/supplierNotes/list'

export interface SupplierNotesAddPayload {
  id: number
  supplier_id: number
  note: string
  platform_id?: number
}

export interface SupplierNotesAddState {
  data: SupplierNoteData | null
  status: SupplierNotesListStatus
  error: string | null
}
