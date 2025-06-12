import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierPaymentsDetailState } from '../../../types/supplierPayments/detail'
import SupplierPaymentsListStatus from '../../../enums/supplierPayments/list'
import { fetchSupplierPayment } from './thunk'

const initialState: SupplierPaymentsDetailState = {
  data: null,
  status: SupplierPaymentsListStatus.IDLE,
  error: null,
}

const supplierPaymentsDetailSlice = createSlice({
  name: 'supplierPaymentsDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplierPayment.pending, (state) => {
        state.status = SupplierPaymentsListStatus.LOADING
        state.error = null
      })
      .addCase(fetchSupplierPayment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierPaymentsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(fetchSupplierPayment.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierPaymentsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierPaymentsDetailSlice.reducer
