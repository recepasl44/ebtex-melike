import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierInvoicesDeleteState } from '../../../types/supplierInvoices/delete'
import SupplierInvoicesListStatus from '../../../enums/supplierInvoices/list'
import { deleteSupplierInvoice } from './thunk'

const initialState: SupplierInvoicesDeleteState = {
  data: null,
  status: SupplierInvoicesListStatus.IDLE,
  error: null,
}

const supplierInvoicesDeleteSlice = createSlice({
  name: 'supplierInvoicesDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSupplierInvoice.pending, (state) => {
        state.status = SupplierInvoicesListStatus.LOADING
        state.error = null
      })
      .addCase(deleteSupplierInvoice.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierInvoicesListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(deleteSupplierInvoice.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierInvoicesListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierInvoicesDeleteSlice.reducer
