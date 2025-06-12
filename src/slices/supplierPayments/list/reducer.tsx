import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchSupplierPayments } from './thunk'
import { SupplierPaymentsListResponse, SupplierPaymentData } from '../../../types/supplierPayments/list'
import SupplierPaymentsListStatus from '../../../enums/supplierPayments/list'

export interface SupplierPaymentsListState {
  data: SupplierPaymentData[] | null
  status: SupplierPaymentsListStatus
  error: string | null
}

const initialState: SupplierPaymentsListState = {
  data: null,
  status: SupplierPaymentsListStatus.IDLE,
  error: null,
}

const supplierPaymentsListSlice = createSlice({
  name: 'supplierPaymentsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSupplierPayments.pending, (state) => {
      state.status = SupplierPaymentsListStatus.LOADING
      state.error = null
    })
    builder.addCase(fetchSupplierPayments.fulfilled, (state, action: PayloadAction<SupplierPaymentsListResponse>) => {
      state.status = SupplierPaymentsListStatus.SUCCEEDED
      state.data = action.payload.data
    })
    builder.addCase(fetchSupplierPayments.rejected, (state, action: PayloadAction<any>) => {
      state.status = SupplierPaymentsListStatus.FAILED
      state.error = action.payload || 'Fetch supplier payments failed'
    })
  },
})

export default supplierPaymentsListSlice.reducer
