import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierPaymentsAddState } from '../../../types/supplierPayments/add'
import { addSupplierPayment } from './thunk'
import SupplierPaymentsListStatus from '../../../enums/supplierPayments/list'

const initialState: SupplierPaymentsAddState = {
  data: null,
  status: SupplierPaymentsListStatus.IDLE,
  error: null,
}

const supplierPaymentsAddSlice = createSlice({
  name: 'supplierPaymentsAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSupplierPayment.pending, (state) => {
        state.status = SupplierPaymentsListStatus.LOADING
        state.error = null
      })
      .addCase(addSupplierPayment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierPaymentsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(addSupplierPayment.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierPaymentsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierPaymentsAddSlice.reducer
