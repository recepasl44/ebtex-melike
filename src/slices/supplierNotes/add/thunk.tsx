import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SupplierNotesAddPayload } from '../../../types/supplierNotes/add'
import { SupplierNoteData } from '../../../types/supplierNotes/list'
import { SUPPLIERS } from '../../../helpers/url_helper'

export const addSupplierNote = createAsyncThunk<SupplierNoteData, SupplierNotesAddPayload>(
  'supplierNotes/addSupplierNote',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${SUPPLIERS}/${payload.supplier_id}/notes`, payload)
      return resp.data.data as SupplierNoteData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add supplier note failed')
    }
  }
)
