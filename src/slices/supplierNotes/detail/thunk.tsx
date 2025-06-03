import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import { SupplierNotesDetailState } from '../../../types/supplierNotes/detail'

export const fetchSupplierNote = createAsyncThunk<SupplierNotesDetailState, { supplierId: number; supplierNoteId: number }>(
  'supplierNotes/fetchSupplierNote',
  async ({ supplierId, supplierNoteId }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SUPPLIERS}/${supplierId}/notes/${supplierNoteId}`)
      return resp.data as SupplierNotesDetailState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch supplier note failed')
    }
  }
)
