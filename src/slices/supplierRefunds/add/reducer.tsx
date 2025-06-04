import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierRefundsAddState } from '../../../types/supplierRefunds/add'
import { addSupplierRefund } from './thunk'
import SupplierRefundsListStatus from '../../../enums/supplierRefunds/list'

const initialState: SupplierRefundsAddState = {
  data: null,
  status: SupplierRefundsListStatus.IDLE,
  error: null,
}

const supplierRefundsAddSlice = createSlice({
  name: 'supplierRefundsAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSupplierRefund.pending, (state) => {
        state.status = SupplierRefundsListStatus.LOADING
        state.error = null
      })
      .addCase(addSupplierRefund.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierRefundsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(addSupplierRefund.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierRefundsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierRefundsAddSlice.reducer
