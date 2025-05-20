import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import { SupplierInvoicesDeleteState } from '../../../types/supplierInvoices/delete'

export const deleteSupplierInvoice = createAsyncThunk<SupplierInvoicesDeleteState, { supplierId: number; supplierInvoiceId: number }>(
  'supplierInvoices/deleteSupplierInvoice',
  async ({ supplierId, supplierInvoiceId }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${SUPPLIERS}/${supplierId}/invoices/${supplierInvoiceId}`)
      return resp.data as SupplierInvoicesDeleteState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete supplier invoice failed')
    }
  }
)
