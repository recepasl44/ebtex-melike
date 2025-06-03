import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierRefundsUpdateState } from '../../../types/supplierRefunds/update'
import SupplierRefundsListStatus from '../../../enums/supplierRefunds/list'
import { updateSupplierRefund } from './thunk'

const initialState: SupplierRefundsUpdateState = {
  data: null,
  status: SupplierRefundsListStatus.IDLE,
  error: null,
}

const supplierRefundsUpdateSlice = createSlice({
  name: 'supplierRefundsUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSupplierRefund.pending, (state) => {
        state.status = SupplierRefundsListStatus.LOADING
        state.error = null
      })
      .addCase(updateSupplierRefund.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierRefundsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(updateSupplierRefund.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierRefundsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierRefundsUpdateSlice.reducer
