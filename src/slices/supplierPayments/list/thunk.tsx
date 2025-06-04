import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import { SupplierPaymentsListArg, SupplierPaymentsListResponse } from '../../../types/supplierPayments/list'

export const fetchSupplierPayments = createAsyncThunk<SupplierPaymentsListResponse, SupplierPaymentsListArg>(
  'supplierPayments/fetchSupplierPayments',
  async (queryParams, { rejectWithValue }) => {
    try {
      const { supplierId, ...rest } = queryParams
      const query = new URLSearchParams()
      Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value))
        }
      })
      const queryString = query.toString()
      const url = `${SUPPLIERS}/${supplierId}/payments${queryString ? `?${queryString}` : ''}`
      const resp = await axiosInstance.get(url)
      return resp.data as SupplierPaymentsListResponse
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch supplier payments failed')
    }
  }
)
