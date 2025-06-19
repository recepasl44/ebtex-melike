import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SupplierDebtsAddState } from '../../../types/supplierDebts/add'
import { addSupplierDebt } from './thunk'
import SupplierDebtsListStatus from '../../../enums/supplierDebts/list'

const initialState: SupplierDebtsAddState = {
  data: null,
  status: SupplierDebtsListStatus.IDLE,
  error: null,
}

const supplierDebtsAddSlice = createSlice({
  name: 'supplierDebtsAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSupplierDebt.pending, (state) => {
        state.status = SupplierDebtsListStatus.LOADING
        state.error = null
      })
      .addCase(addSupplierDebt.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierDebtsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(addSupplierDebt.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierDebtsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default supplierDebtsAddSlice.reducer
