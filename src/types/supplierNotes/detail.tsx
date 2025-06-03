import { SupplierNoteData } from './list'
import SupplierNotesListStatus from '../../enums/supplierNotes/list'

export interface SupplierNotesDetailState {
  data: SupplierNoteData | null
  status: SupplierNotesListStatus
  error: string | null
}
