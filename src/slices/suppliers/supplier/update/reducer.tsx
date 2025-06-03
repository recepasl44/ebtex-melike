import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SuppliersUpdateState } from '../../../../types/suppliers/supplier/update'
import { updateSupplier } from './thunk'
import SuppliersUpdateStatus from '../../../../enums/suppliers/update'

const initialState: SuppliersUpdateState = {
  data: null,
  status: SuppliersUpdateStatus.IDLE,
  error: null,
}

const suppliersUpdateSlice = createSlice({
  name: 'suppliersUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSupplier.pending, (state) => {
        state.status = SuppliersUpdateStatus.LOADING
        state.error = null
      })
      .addCase(updateSupplier.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SuppliersUpdateStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(updateSupplier.rejected, (state, action: PayloadAction<any>) => {
        state.status = SuppliersUpdateStatus.FAILED
        state.error = action.payload
      })
  },
})

export default suppliersUpdateSlice.reducer
