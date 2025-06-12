import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { PAYMENT_METHODS } from '../../../helpers/url_helper'
import { PaymentMethodUpdatePayload } from '../../../types/paymentMethods/update'
import { PaymentMethod } from '../../../types/paymentMethods/list'

export const updatePaymentMethod = createAsyncThunk<
  PaymentMethod,
  PaymentMethodUpdatePayload
>('paymentMethods/updatePaymentMethod', async ({ paymentMethodId, payload }, { rejectWithValue }) => {
  try {
    const resp = await axiosInstance.put(`${PAYMENT_METHODS}/${paymentMethodId}`, payload)
    return resp.data.data as PaymentMethod
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Update payment method failed')
  }
})
