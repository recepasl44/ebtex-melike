import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SupplierRefundsUpdatePayload } from '../../../types/supplierRefunds/update'
import { SupplierRefundData } from '../../../types/supplierRefunds/list'
import { SUPPLIERS } from '../../../helpers/url_helper'

export const updateSupplierRefund = createAsyncThunk<SupplierRefundData, SupplierRefundsUpdatePayload>(
  'supplierRefunds/updateSupplierRefund',
  async ({ supplierId, supplierRefundId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${SUPPLIERS}/${supplierId}/refunds/${supplierRefundId}`, payload)
      return resp.data.data as SupplierRefundData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update supplier refund failed')
    }
  }
)
