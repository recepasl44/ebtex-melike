import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierDebtsDeleteState } from '../../../types/supplierDebts/delete'
import SupplierDebtsListStatus from '../../../enums/supplierDebts/list'
import { deleteSupplierDebt } from './thunk'

const initialState: SupplierDebtsDeleteState = {
  data: null,
  status: SupplierDebtsListStatus.IDLE,
  error: null,
}

const supplierDebtsDeleteSlice = createSlice({
  name: 'supplierDebtsDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSupplierDebt.pending, (state) => {
        state.status = SupplierDebtsListStatus.LOADING
        state.error = null
      })
      .addCase(deleteSupplierDebt.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierDebtsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(deleteSupplierDebt.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierDebtsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierDebtsDeleteSlice.reducer
