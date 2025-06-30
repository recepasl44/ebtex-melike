import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONTRACT_EMPLOYEES } from '../../../helpers/url_helper'
import { ContractEmployeeShowState } from '../../../types/contractEmployees/detail'

export const fetchContractEmployee = createAsyncThunk<ContractEmployeeShowState, number>(
  'contractEmployees/fetchContractEmployee',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${CONTRACT_EMPLOYEES}/${employeeId}`)
      return response.data.data as ContractEmployeeShowState
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fetch contract employee failed')
    }
  }
)
