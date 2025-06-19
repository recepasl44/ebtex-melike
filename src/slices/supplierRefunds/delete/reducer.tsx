import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierRefundsDeleteState } from '../../../types/supplierRefunds/delete'
import SupplierRefundsListStatus from '../../../enums/supplierRefunds/list'
import { deleteSupplierRefund } from './thunk'

const initialState: SupplierRefundsDeleteState = {
  data: null,
  status: SupplierRefundsListStatus.IDLE,
  error: null,
}

const supplierRefundsDeleteSlice = createSlice({
  name: 'supplierRefundsDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSupplierRefund.pending, (state) => {
        state.status = SupplierRefundsListStatus.LOADING
        state.error = null
      })
      .addCase(deleteSupplierRefund.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierRefundsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(deleteSupplierRefund.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierRefundsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierRefundsDeleteSlice.reducer
