import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SupplierInvoicesUpdatePayload } from '../../../types/supplierInvoices/update'
import { SupplierInvoiceData } from '../../../types/supplierInvoices/list'
import { SUPPLIERS } from '../../../helpers/url_helper'

export const updateSupplierInvoice = createAsyncThunk<SupplierInvoiceData, SupplierInvoicesUpdatePayload>(
  'supplierInvoices/updateSupplierInvoice',
  async ({ supplierId, supplierInvoiceId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${SUPPLIERS}/${supplierId}/invoices/${supplierInvoiceId}`, payload)
      return resp.data.data as SupplierInvoiceData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update supplier invoice failed')
    }
  }
)
