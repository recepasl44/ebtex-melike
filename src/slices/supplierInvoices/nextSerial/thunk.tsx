import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { InvoiceNextSerialArg, InvoiceNextSerialResponse } from '../../../types/supplierInvoices/nextSerial'
import { INVOICE_NEXT_SERIAL_URL } from '../../../helpers/url_helper'

export const getNextSerial = createAsyncThunk<
  InvoiceNextSerialResponse, // dönen değer
  InvoiceNextSerialArg       // parametre
>(
  'invoices/getNextSerial',
  async (_, { rejectWithValue }) => {
    try {
      // Sizin paylaştığınız endpoint => /api/v1/invoices/next-serial
      const resp = await axiosInstance.get(INVOICE_NEXT_SERIAL_URL)
      return resp.data as InvoiceNextSerialResponse
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Get next serial failed')
    }
  }
)
