import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SupplierPaymentsUpdatePayload } from '../../../types/supplierPayments/update'
import { SupplierPaymentData } from '../../../types/supplierPayments/list'
import { SUPPLIERS } from '../../../helpers/url_helper'

export const updateSupplierPayment = createAsyncThunk<SupplierPaymentData, SupplierPaymentsUpdatePayload>(
  'supplierPayments/updateSupplierPayment',
  async ({ supplierId, supplierPaymentId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${SUPPLIERS}/${supplierId}/payments/${supplierPaymentId}`, payload)
      return resp.data.data as SupplierPaymentData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update supplier payment failed')
    }
  }
)
