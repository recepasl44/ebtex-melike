import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SupplierRefundsAddPayload } from '../../../types/supplierRefunds/add'
import { SupplierRefundData } from '../../../types/supplierRefunds/list'
import { SUPPLIERS } from '../../../helpers/url_helper'

export const addSupplierRefund = createAsyncThunk<SupplierRefundData, SupplierRefundsAddPayload>(
  'supplierRefunds/addSupplierRefund',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${SUPPLIERS}/${payload.supplier_id}/refunds`, payload)
      return resp.data.data as SupplierRefundData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add supplier refund failed')
    }
  }
)
