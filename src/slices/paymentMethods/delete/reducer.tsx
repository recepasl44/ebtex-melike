import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deletePaymentMethod } from './thunk'
import { PaymentMethodDeleteState } from '../../../types/paymentMethods/delete'
import { PaymentMethodsListStatus } from '../../../enums/paymentMethods/list'

const initialState: PaymentMethodDeleteState = {
  data: null,
  status: PaymentMethodsListStatus.IDLE,
  error: null,
}

const paymentMethodsDeleteSlice = createSlice({
  name: 'paymentMethodsDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePaymentMethod.pending, (state) => {
        state.status = PaymentMethodsListStatus.LOADING
        state.error = null
      })
      .addCase(deletePaymentMethod.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PaymentMethodsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(deletePaymentMethod.rejected, (state, action: PayloadAction<any>) => {
        state.status = PaymentMethodsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default paymentMethodsDeleteSlice.reducer
