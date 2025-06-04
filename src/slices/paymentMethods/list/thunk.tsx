import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { PAYMENT_METHODS } from '../../../helpers/url_helper'
import { PaymentMethodsListResponse, PaymentMethodsListArg } from '../../../types/paymentMethods/list'

export const fetchPaymentMethods = createAsyncThunk<
  PaymentMethodsListResponse,
  PaymentMethodsListArg
>('paymentMethods/fetchPaymentMethods', async (queryParams, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams()
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'enabled') {
        query.append(key, String(value))
      }
    })
    const queryString = query.toString()
    const url = `${PAYMENT_METHODS}?${queryString}`
    const resp = await axiosInstance.get(url)
    return resp.data as PaymentMethodsListResponse
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Fetch payment methods failed')
  }
})
