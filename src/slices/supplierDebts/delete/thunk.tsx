import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import { SupplierDebtsDeleteState } from '../../../types/supplierDebts/delete'

export const deleteSupplierDebt = createAsyncThunk<SupplierDebtsDeleteState, { supplierId: number; supplierDebtId: number }>(
  'supplierDebts/deleteSupplierDebt',
  async ({ supplierId, supplierDebtId }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${SUPPLIERS}/${supplierId}/debts/${supplierDebtId}`)
      return resp.data as SupplierDebtsDeleteState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete supplier debt failed')
    }
  }
)
