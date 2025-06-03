import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { SUPPLIERS } from '../../../helpers/url_helper'
import { SupplierDebtsDetailState } from '../../../types/supplierDebts/detail'

export const fetchSupplierDebt = createAsyncThunk<SupplierDebtsDetailState, { supplierId: number; supplierDebtId: number }>(
  'supplierDebts/fetchSupplierDebt',
  async ({ supplierId, supplierDebtId }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SUPPLIERS}/${supplierId}/debts/${supplierDebtId}`)
      return { data: resp.data, status: '', error: null } as unknown as SupplierDebtsDetailState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch supplier debt failed')
    }
  }
)
