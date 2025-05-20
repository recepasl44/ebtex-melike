import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierDebtsUpdateState } from '../../../types/supplierDebts/update'
import SupplierDebtsListStatus from '../../../enums/supplierDebts/list'
import { updateSupplierDebt } from './thunk'

const initialState: SupplierDebtsUpdateState = {
  data: null,
  status: SupplierDebtsListStatus.IDLE,
  error: null,
}

const supplierDebtsUpdateSlice = createSlice({
  name: 'supplierDebtsUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSupplierDebt.pending, (state) => {
        state.status = SupplierDebtsListStatus.LOADING
        state.error = null
      })
      .addCase(updateSupplierDebt.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierDebtsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(updateSupplierDebt.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierDebtsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierDebtsUpdateSlice.reducer
