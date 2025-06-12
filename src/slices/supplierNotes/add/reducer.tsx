import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierNotesAddState } from '../../../types/supplierNotes/add'
import { addSupplierNote } from './thunk'
import SupplierNotesListStatus from '../../../enums/supplierNotes/list'

const initialState: SupplierNotesAddState = {
  data: null,
  status: SupplierNotesListStatus.IDLE,
  error: null,
}

const supplierNotesAddSlice = createSlice({
  name: 'supplierNotesAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSupplierNote.pending, (state) => {
        state.status = SupplierNotesListStatus.LOADING
        state.error = null
      })
      .addCase(addSupplierNote.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierNotesListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(addSupplierNote.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierNotesListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierNotesAddSlice.reducer
