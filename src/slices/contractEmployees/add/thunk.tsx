import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONTRACT_EMPLOYEES } from '../../../helpers/url_helper'
import { ContractEmployeesAddPayload } from '../../../types/contractEmployees/add'
import { data } from '../../../types/contractEmployees/list'

export const addContractEmployee = createAsyncThunk<data, ContractEmployeesAddPayload>(
  'contractEmployees/addContractEmployee',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(CONTRACT_EMPLOYEES, payload)
      return resp.data.data as data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add contract employee failed')
    }
  }
)
