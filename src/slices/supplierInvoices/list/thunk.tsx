import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import { SupplierInvoicesListResponse, SupplierInvoicesListArg } from '../../../types/supplierInvoices/list'

export const fetchSupplierInvoices = createAsyncThunk<SupplierInvoicesListResponse, SupplierInvoicesListArg>(
  'supplierInvoices/fetchSupplierInvoices',
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
      const url = `${SUPPLIERS}/${supplierId}/invoices?${queryString}`
      const resp = await axiosInstance.get(url)
      return resp.data as SupplierInvoicesListResponse
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch supplier invoices failed')
    }
  }
)
