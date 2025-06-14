import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import {SupplierRefundData } from '../../../types/supplierRefunds/list'

export const fetchSupplierRefund = createAsyncThunk<SupplierRefundData, { supplierId: number; supplierRefundId: number }>(
  'supplierRefunds/fetchSupplierRefund',
  async ({ supplierId, supplierRefundId }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SUPPLIERS}/${supplierId}/refunds/${supplierRefundId}`)
      
      return resp.data   as  SupplierRefundData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch supplier refund failed')
    }
  }
)
