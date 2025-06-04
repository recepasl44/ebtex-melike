import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { PAYMENT_METHODS } from '../../../helpers/url_helper'
import { PaymentMethodDeleteState } from '../../../types/paymentMethods/delete'

export const deletePaymentMethod = createAsyncThunk<PaymentMethodDeleteState, number>(
  'paymentMethods/deletePaymentMethod',
  async (paymentMethodId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${PAYMENT_METHODS}/${paymentMethodId}`)
      return resp.data as PaymentMethodDeleteState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete payment method failed')
    }
  }
)
