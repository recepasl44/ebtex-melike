import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SupplierInvoicesAddPayload } from '../../../types/supplierInvoices/add'
import { SupplierInvoiceData } from '../../../types/supplierInvoices/list'
import { SUPPLIERS } from '../../../helpers/url_helper'

export const addSupplierInvoice = createAsyncThunk<SupplierInvoiceData, SupplierInvoicesAddPayload>(
  'supplierInvoices/addSupplierInvoice',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${SUPPLIERS}/${payload.supplier_id}/invoices`, payload)
      return resp.data.data as SupplierInvoiceData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add supplier invoice failed')
    }
  }
)
