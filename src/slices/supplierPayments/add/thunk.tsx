import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SupplierPaymentsAddPayload } from '../../../types/supplierPayments/add'
import { SupplierPaymentData } from '../../../types/supplierPayments/list'
import { SUPPLIERS } from '../../../helpers/url_helper'

export const addSupplierPayment = createAsyncThunk<SupplierPaymentData, SupplierPaymentsAddPayload>(
  'supplierPayments/addSupplierPayment',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${SUPPLIERS}/${payload.supplier_id}/payments`, payload)
      return resp.data.data as SupplierPaymentData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add supplier payment failed')
    }
  }
)
