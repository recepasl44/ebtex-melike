import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { PAYMENT_METHODS } from '../../../helpers/url_helper'
import { PaymentMethodAddPayload } from '../../../types/paymentMethods/add'
import { PaymentMethod } from '../../../types/paymentMethods/list'

export const addPaymentMethod = createAsyncThunk<PaymentMethod, PaymentMethodAddPayload>(
  'paymentMethods/addPaymentMethod',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(PAYMENT_METHODS, payload)
      return resp.data.data as PaymentMethod
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add payment method failed')
    }
  }
)
