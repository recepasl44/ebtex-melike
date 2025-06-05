import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchSupplierRefund } from './thunk'
import { SupplierRefundsDetailState } from '../../../types/supplierRefunds/detail'
import SupplierRefundsListStatus from '../../../enums/supplierRefunds/list'
import {SupplierRefundData } from '../../../types/supplierRefunds/list'

const initialState: SupplierRefundsDetailState = {
  data: null,
  status: SupplierRefundsListStatus.IDLE,
  error: null,
}

const supplierRefundsDetailSlice = createSlice({
  name: 'supplierRefundsDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplierRefund.pending, (state) => {
        state.status = SupplierRefundsListStatus.LOADING
        state.error = null
      })
      .addCase(fetchSupplierRefund.fulfilled, (state, action: PayloadAction<SupplierRefundData>) => {
        state.status = SupplierRefundsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(fetchSupplierRefund.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierRefundsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierRefundsDetailSlice.reducer
