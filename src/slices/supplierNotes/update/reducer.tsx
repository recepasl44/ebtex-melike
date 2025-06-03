import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierNotesUpdateState } from '../../../types/supplierNotes/update'
import SupplierNotesListStatus from '../../../enums/supplierNotes/list'
import { updateSupplierNote } from './thunk'

const initialState: SupplierNotesUpdateState = {
  data: null,
  status: SupplierNotesListStatus.IDLE,
  error: null,
}

const supplierNotesUpdateSlice = createSlice({
  name: 'supplierNotesUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSupplierNote.pending, (state) => {
        state.status = SupplierNotesListStatus.LOADING
        state.error = null
      })
      .addCase(updateSupplierNote.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierNotesListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(updateSupplierNote.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierNotesListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierNotesUpdateSlice.reducer
