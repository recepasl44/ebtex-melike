import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import { SupplierPaymentsDeleteState } from '../../../types/supplierPayments/delete'

export const deleteSupplierPayment = createAsyncThunk<SupplierPaymentsDeleteState, { supplierId: number; supplierPaymentId: number }>(
  'supplierPayments/deleteSupplierPayment',
  async ({ supplierId, supplierPaymentId }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${SUPPLIERS}/${supplierId}/payments/${supplierPaymentId}`)
      return resp.data as SupplierPaymentsDeleteState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete supplier payment failed')
    }
  }
)
