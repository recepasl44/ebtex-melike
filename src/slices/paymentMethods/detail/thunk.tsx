import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { PAYMENT_METHODS } from '../../../helpers/url_helper'
import { PaymentMethod } from '../../../types/paymentMethods/list'

export const fetchPaymentMethod = createAsyncThunk<PaymentMethod, number>(
  'paymentMethods/fetchPaymentMethod',
  async (paymentMethodId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${PAYMENT_METHODS}/${paymentMethodId}`)
      return resp.data.data as PaymentMethod
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch payment method failed')
    }
  }
)
