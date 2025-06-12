import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierNotesDeleteState } from '../../../types/supplierNotes/delete'
import SupplierNotesListStatus from '../../../enums/supplierNotes/list'
import { deleteSupplierNote } from './thunk'

const initialState: SupplierNotesDeleteState = {
  data: null,
  status: SupplierNotesListStatus.IDLE,
  error: null,
}

const supplierNotesDeleteSlice = createSlice({
  name: 'supplierNotesDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSupplierNote.pending, (state) => {
        state.status = SupplierNotesListStatus.LOADING
        state.error = null
      })
      .addCase(deleteSupplierNote.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierNotesListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(deleteSupplierNote.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierNotesListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierNotesDeleteSlice.reducer
