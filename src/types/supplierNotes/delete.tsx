import { SupplierNoteData } from './list'
import SupplierNotesListStatus from '../../enums/supplierNotes/list'

export interface SupplierNotesDeletePayload {
  id?: number
}

export interface SupplierNotesDeleteState {
  data: SupplierNoteData | null
  status: SupplierNotesListStatus
  error: string | null
}
