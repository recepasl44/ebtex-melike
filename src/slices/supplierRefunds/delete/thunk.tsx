import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import { SupplierRefundsDeleteState } from '../../../types/supplierRefunds/delete'

export const deleteSupplierRefund = createAsyncThunk<SupplierRefundsDeleteState, { supplierId: number; supplierRefundId: number }>(
  'supplierRefunds/deleteSupplierRefund',
  async ({ supplierId, supplierRefundId }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${SUPPLIERS}/${supplierId}/refunds/${supplierRefundId}`)
      return resp.data as SupplierRefundsDeleteState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete supplier refund failed')
    }
  }
)
