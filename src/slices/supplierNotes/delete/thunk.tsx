import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import { SupplierNotesDeleteState } from '../../../types/supplierNotes/delete'

export const deleteSupplierNote = createAsyncThunk<SupplierNotesDeleteState, { supplierId: number; supplierNoteId: number }>(
  'supplierNotes/deleteSupplierNote',
  async ({ supplierId, supplierNoteId }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${SUPPLIERS}/${supplierId}/notes/${supplierNoteId}`)
      return resp.data as SupplierNotesDeleteState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete supplier note failed')
    }
  }
)
