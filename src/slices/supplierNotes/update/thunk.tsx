import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SupplierNotesUpdatePayload } from '../../../types/supplierNotes/update'
import { SupplierNoteData } from '../../../types/supplierNotes/list'
import { SUPPLIERS } from '../../../helpers/url_helper'

export const updateSupplierNote = createAsyncThunk<SupplierNoteData, SupplierNotesUpdatePayload>(
  'supplierNotes/updateSupplierNote',
  async ({ supplierId, supplierNoteId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${SUPPLIERS}/${supplierId}/notes/${supplierNoteId}`, payload)
      return resp.data.data as SupplierNoteData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update supplier note failed')
    }
  }
)
