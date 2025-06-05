import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchSupplierDebt } from './thunk'
import { SupplierDebtsDetailState } from '../../../types/supplierDebts/detail'
import SupplierDebtsListStatus from '../../../enums/supplierDebts/list'

const initialState: SupplierDebtsDetailState = {
  data: null,
  status: SupplierDebtsListStatus.IDLE,
  error: null,
}

const supplierDebtsDetailSlice = createSlice({
  name: 'supplierDebtsDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplierDebt.pending, (state) => {
        state.status = SupplierDebtsListStatus.LOADING
        state.error = null
      })
      .addCase(fetchSupplierDebt.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierDebtsListStatus.SUCCEEDED
        state.data = action.payload.data
      })
      .addCase(fetchSupplierDebt.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierDebtsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierDebtsDetailSlice.reducer
