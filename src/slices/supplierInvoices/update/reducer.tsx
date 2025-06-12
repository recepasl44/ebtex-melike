import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierInvoicesUpdateState } from '../../../types/supplierInvoices/update'
import SupplierInvoicesListStatus from '../../../enums/supplierInvoices/list'
import { updateSupplierInvoice } from './thunk'

const initialState: SupplierInvoicesUpdateState = {
  data: null,
  status: SupplierInvoicesListStatus.IDLE,
  error: null,
}

const supplierInvoicesUpdateSlice = createSlice({
  name: 'supplierInvoicesUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSupplierInvoice.pending, (state) => {
        state.status = SupplierInvoicesListStatus.LOADING
        state.error = null
      })
      .addCase(updateSupplierInvoice.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierInvoicesListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(updateSupplierInvoice.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierInvoicesListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierInvoicesUpdateSlice.reducer
