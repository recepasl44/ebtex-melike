import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierPaymentsUpdateState } from '../../../types/supplierPayments/update'
import SupplierPaymentsListStatus from '../../../enums/supplierPayments/list'
import { updateSupplierPayment } from './thunk'

const initialState: SupplierPaymentsUpdateState = {
  data: null,
  status: SupplierPaymentsListStatus.IDLE,
  error: null,
}

const supplierPaymentsUpdateSlice = createSlice({
  name: 'supplierPaymentsUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSupplierPayment.pending, (state) => {
        state.status = SupplierPaymentsListStatus.LOADING
        state.error = null
      })
      .addCase(updateSupplierPayment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierPaymentsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(updateSupplierPayment.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierPaymentsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierPaymentsUpdateSlice.reducer
