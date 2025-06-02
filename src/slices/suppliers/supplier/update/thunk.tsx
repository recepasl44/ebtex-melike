import { createAsyncThunk } from '@reduxjs/toolkit'
import { SuppliersUpdatePayload } from '../../../../types/suppliers/supplier/update'
import { Supplier } from '../../../../types/suppliers/supplier/list'
import axiosInstance from '../../../../services/axiosClient'
import { SUPPLIERS } from '../../../../helpers/url_helper'

export const updateSupplier = createAsyncThunk<Supplier, SuppliersUpdatePayload>(
  'suppliers/updateSupplier',
  async ({ supplierId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${SUPPLIERS}/${supplierId}`, payload)
      return resp.data.data as Supplier
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update supplier failed')
    }
  }
)
