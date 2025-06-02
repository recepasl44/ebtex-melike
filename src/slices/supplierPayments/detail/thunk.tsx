import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import { SupplierPaymentsDetailState } from '../../../types/supplierPayments/detail'

export const fetchSupplierPayment = createAsyncThunk<SupplierPaymentsDetailState, { supplierId: number; supplierPaymentId: number }>(
  'supplierPayments/fetchSupplierPayment',
  async ({ supplierId, supplierPaymentId }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SUPPLIERS}/${supplierId}/payments/${supplierPaymentId}`)
      return resp.data as SupplierPaymentsDetailState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch supplier payment failed')
    }
  }
)
