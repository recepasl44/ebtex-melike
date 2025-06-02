import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierInvoicesAddState } from '../../../types/supplierInvoices/add'
import { addSupplierInvoice } from './thunk'
import SupplierInvoicesListStatus from '../../../enums/supplierInvoices/list'

const initialState: SupplierInvoicesAddState = {
  data: null,
  status: SupplierInvoicesListStatus.IDLE,
  error: null,
}

const supplierInvoicesAddSlice = createSlice({
  name: 'supplierInvoicesAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSupplierInvoice.pending, (state) => {
        state.status = SupplierInvoicesListStatus.LOADING
        state.error = null
      })
      .addCase(addSupplierInvoice.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierInvoicesListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(addSupplierInvoice.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierInvoicesListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierInvoicesAddSlice.reducer
