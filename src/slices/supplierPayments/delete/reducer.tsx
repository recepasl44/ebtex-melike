import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierPaymentsDeleteState } from '../../../types/supplierPayments/delete'
import SupplierPaymentsListStatus from '../../../enums/supplierPayments/list'
import { deleteSupplierPayment } from './thunk'

const initialState: SupplierPaymentsDeleteState = {
  data: null,
  status: SupplierPaymentsListStatus.IDLE,
  error: null,
}

const supplierPaymentsDeleteSlice = createSlice({
  name: 'supplierPaymentsDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSupplierPayment.pending, (state) => {
        state.status = SupplierPaymentsListStatus.LOADING
        state.error = null
      })
      .addCase(deleteSupplierPayment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierPaymentsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(deleteSupplierPayment.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierPaymentsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierPaymentsDeleteSlice.reducer
