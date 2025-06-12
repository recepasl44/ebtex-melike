import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updatePaymentMethod } from './thunk'
import { PaymentMethodUpdateState } from '../../../types/paymentMethods/update'
import { PaymentMethodsListStatus } from '../../../enums/paymentMethods/list'

const initialState: PaymentMethodUpdateState = {
  data: null,
  status: PaymentMethodsListStatus.IDLE,
  error: null,
}

const paymentMethodsUpdateSlice = createSlice({
  name: 'paymentMethodsUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePaymentMethod.pending, (state) => {
        state.status = PaymentMethodsListStatus.LOADING
        state.error = null
      })
      .addCase(updatePaymentMethod.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PaymentMethodsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(updatePaymentMethod.rejected, (state, action: PayloadAction<any>) => {
        state.status = PaymentMethodsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default paymentMethodsUpdateSlice.reducer
