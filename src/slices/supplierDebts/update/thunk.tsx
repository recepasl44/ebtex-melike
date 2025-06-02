import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SupplierDebtsUpdatePayload } from '../../../types/supplierDebts/update'
import { SupplierDebtData } from '../../../types/supplierDebts/list'
import { SUPPLIERS } from '../../../helpers/url_helper'

export const updateSupplierDebt = createAsyncThunk<SupplierDebtData, SupplierDebtsUpdatePayload>(
  'supplierDebts/updateSupplierDebt',
  async ({ supplierId, supplierDebtId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${SUPPLIERS}/${supplierId}/debts/${supplierDebtId}`, payload)
      return resp.data.data as SupplierDebtData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update supplier debt failed')
    }
  }
)
