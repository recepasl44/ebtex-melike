import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SupplierDebtsAddPayload } from '../../../types/supplierDebts/add'
import { SupplierDebtData } from '../../../types/supplierDebts/list'
import { SUPPLIERS } from '../../../helpers/url_helper'

export const addSupplierDebt = createAsyncThunk<SupplierDebtData, SupplierDebtsAddPayload>(
  'supplierDebts/addSupplierDebt',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${SUPPLIERS}/${payload.supplier_id}/debts`, payload)
      return resp.data.data as SupplierDebtData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add supplier debt failed')
    }
  }
)
