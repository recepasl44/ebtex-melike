import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import { SupplierDebtsListResponse, SupplierDebtsListArg } from '../../../types/supplierDebts/list'

export const fetchSupplierDebts = createAsyncThunk<SupplierDebtsListResponse, SupplierDebtsListArg>(
  'supplierDebts/fetchSupplierDebts',
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
      const url = `${SUPPLIERS}/${supplierId}/debts?${queryString}`
      const resp = await axiosInstance.get(url)

      return resp.data as SupplierDebtsListResponse
   
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch supplier debts failed')
    }
  }
)
