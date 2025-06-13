import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchSupplierRefunds } from './thunk'
import { SupplierRefundsListResponse, SupplierRefundData } from '../../../types/supplierRefunds/list'
import SupplierRefundsListStatus from '../../../enums/supplierRefunds/list'

export interface SupplierRefundsListState {
  data: SupplierRefundData[] | null
  status: SupplierRefundsListStatus
  error: string | null
}

const initialState: SupplierRefundsListState = {
  data: null,
  status: SupplierRefundsListStatus.IDLE,
  error: null,
}

const supplierRefundsListSlice = createSlice({
  name: 'supplierRefundsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSupplierRefunds.pending, (state) => {
      state.status = SupplierRefundsListStatus.LOADING
      state.error = null
    })
    builder.addCase(fetchSupplierRefunds.fulfilled, (state, action: PayloadAction<SupplierRefundsListResponse>) => {
      state.status = SupplierRefundsListStatus.SUCCEEDED
      state.data = action.payload.data
    })
    builder.addCase(fetchSupplierRefunds.rejected, (state, action: PayloadAction<any>) => {
      state.status = SupplierRefundsListStatus.FAILED
      state.error = action.payload || 'Fetch supplier refunds failed'
    })
  },
})

export default supplierRefundsListSlice.reducer
