import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPaymentMethod } from './thunk'
import { PaymentMethodDetailState } from '../../../types/paymentMethods/detail'
import { PaymentMethodsListStatus } from '../../../enums/paymentMethods/list'

const initialState: PaymentMethodDetailState = {
  data: null,
  status: PaymentMethodsListStatus.IDLE,
  error: null,
}

const paymentMethodDetailSlice = createSlice({
  name: 'paymentMethodDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentMethod.pending, (state) => {
        state.status = PaymentMethodsListStatus.LOADING
        state.error = null
      })
      .addCase(fetchPaymentMethod.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PaymentMethodsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(fetchPaymentMethod.rejected, (state, action: PayloadAction<any>) => {
        state.status = PaymentMethodsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default paymentMethodDetailSlice.reducer
