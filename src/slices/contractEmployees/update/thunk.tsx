import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONTRACT_EMPLOYEES } from '../../../helpers/url_helper'
import { ContractEmployeesUpdatePayload } from '../../../types/contractEmployees/update'
import { data } from '../../../types/contractEmployees/list'

export const updateContractEmployee = createAsyncThunk<data, ContractEmployeesUpdatePayload>(
  'contractEmployees/updateContractEmployee',
  async ({ employeeId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${CONTRACT_EMPLOYEES}/${employeeId}`, payload)
      return resp.data.data as data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update contract employee failed')
    }
  }
)
