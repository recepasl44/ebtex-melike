import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import { SupplierInvoicesDetailState } from '../../../types/supplierInvoices/detail'

export const fetchSupplierInvoice = createAsyncThunk<SupplierInvoicesDetailState, { supplierId: number; supplierInvoiceId: number }>(
  'supplierInvoices/fetchSupplierInvoice',
  async ({ supplierId, supplierInvoiceId }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SUPPLIERS}/${supplierId}/invoices/${supplierInvoiceId}`)
      return resp.data as SupplierInvoicesDetailState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch supplier invoice failed')
    }
  }
)
