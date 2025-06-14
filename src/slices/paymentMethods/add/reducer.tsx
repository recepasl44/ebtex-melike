import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaymentMethodAddState } from '../../../types/paymentMethods/add'
import { PaymentMethodsListStatus } from '../../../enums/paymentMethods/list'
import { addPaymentMethod } from './thunk'

const initialState: PaymentMethodAddState = {
  data: null,
  status: PaymentMethodsListStatus.IDLE,
  error: null,
}

const paymentMethodAddSlice = createSlice({
  name: 'paymentMethodAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPaymentMethod.pending, (state) => {
        state.status = PaymentMethodsListStatus.LOADING
        state.error = null
      })
      .addCase(addPaymentMethod.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PaymentMethodsListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(addPaymentMethod.rejected, (state, action: PayloadAction<any>) => {
        state.status = PaymentMethodsListStatus.FAILED
        state.error = action.payload
      })
  },
})

export default paymentMethodAddSlice.reducer
