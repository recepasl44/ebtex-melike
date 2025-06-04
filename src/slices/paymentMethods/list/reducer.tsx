import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPaymentMethods } from './thunk'
import { PaymentMethodsListResponse } from '../../../types/paymentMethods/list'
import { PaymentMethodsListStatus } from '../../../enums/paymentMethods/list'

export interface PaymentMethodsListState {
  data: PaymentMethodsListResponse['data'] | null
  links: PaymentMethodsListResponse['links'] | null
  meta: PaymentMethodsListResponse['meta'] | null
  status: PaymentMethodsListStatus
  error: string | null
}

const initialState: PaymentMethodsListState = {
  data: null,
  links: null,
  meta: null,
  status: PaymentMethodsListStatus.IDLE,
  error: null,
}

const paymentMethodsListSlice = createSlice({
  name: 'paymentMethods/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.status = PaymentMethodsListStatus.LOADING
        state.error = null
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action: PayloadAction<PaymentMethodsListResponse>) => {
        state.status = PaymentMethodsListStatus.SUCCEEDED
        state.data = action.payload.data
        state.links = action.payload.links
        state.meta = action.payload.meta
      })
      .addCase(fetchPaymentMethods.rejected, (state, action: PayloadAction<any>) => {
        state.status = PaymentMethodsListStatus.FAILED
        state.error = action.payload || 'Fetch payment methods failed'
      })
  },
})

export default paymentMethodsListSlice.reducer
