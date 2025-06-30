import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONTRACT_EMPLOYEES } from '../../../helpers/url_helper'
import { ContractEmployeesDeleteState } from '../../../types/contractEmployees/delete'

export const deleteContractEmployee = createAsyncThunk<ContractEmployeesDeleteState, number>(
  'contractEmployees/deleteContractEmployee',
  async (employeeId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${CONTRACT_EMPLOYEES}/${employeeId}`)
      return resp.data as ContractEmployeesDeleteState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete contract employee failed')
    }
  }
)
