import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import { SupplierRefundsListResponse, SupplierRefundsListArg } from '../../../types/supplierRefunds/list'

export const fetchSupplierRefunds = createAsyncThunk<SupplierRefundsListResponse, SupplierRefundsListArg>(
  'supplierRefunds/fetchSupplierRefunds',
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
      const url = `${SUPPLIERS}/${supplierId}/refunds${queryString ? `?${queryString}` : ''}`
      const resp = await axiosInstance.get(url)
      return resp.data as SupplierRefundsListResponse
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch supplier refunds failed')
    }
  }
)
