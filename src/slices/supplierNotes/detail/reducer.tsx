import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierNotesDetailState } from '../../../types/supplierNotes/detail'
import SupplierNotesListStatus from '../../../enums/supplierNotes/list'
import { fetchSupplierNote } from './thunk'

const initialState: SupplierNotesDetailState = {
  data: null,
  status: SupplierNotesListStatus.IDLE,
  error: null,
}

const supplierNotesDetailSlice = createSlice({
  name: 'supplierNotesDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplierNote.pending, (state) => {
        state.status = SupplierNotesListStatus.LOADING
        state.error = null
      })
      .addCase(fetchSupplierNote.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierNotesListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(fetchSupplierNote.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierNotesListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierNotesDetailSlice.reducer
