import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierInvoicesDetailState } from '../../../types/supplierInvoices/detail'
import SupplierInvoicesListStatus from '../../../enums/supplierInvoices/list'
import { fetchSupplierInvoice } from './thunk'

const initialState: SupplierInvoicesDetailState = {
  data: null,
  status: SupplierInvoicesListStatus.IDLE,
  error: null,
}

const supplierInvoicesDetailSlice = createSlice({
  name: 'supplierInvoicesDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplierInvoice.pending, (state) => {
        state.status = SupplierInvoicesListStatus.LOADING
        state.error = null
      })
      .addCase(fetchSupplierInvoice.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierInvoicesListStatus.SUCCEEDED
        state.data = action.payload.data
      })
      .addCase(fetchSupplierInvoice.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierInvoicesListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierInvoicesDetailSlice.reducer
