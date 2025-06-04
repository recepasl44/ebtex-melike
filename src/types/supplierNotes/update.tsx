import { SupplierNoteData } from './list'
import SupplierNotesListStatus from '../../enums/supplierNotes/list'

export interface SupplierNotesUpdatePayload {
  supplierId: number
  supplierNoteId: number
  payload: {
    note?: string
    platform_id?: number
  }
}

export interface SupplierNotesUpdateState {
  data: SupplierNoteData | null
  status: SupplierNotesListStatus
  error: string | null
}
