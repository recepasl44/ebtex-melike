import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { CONTRACT_EMPLOYEES } from '../../../helpers/url_helper'
import { ListContractEmployeesResponse, ContractEmployeeListArg } from '../../../types/contractEmployees/list'

export const fetchContractEmployees = createAsyncThunk<ListContractEmployeesResponse, ContractEmployeeListArg>(
  'contractEmployees/fetchContractEmployees',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams()

      Object.entries(queryParams).forEach(([key, value]) => {
        if (key === 'enabled') return
        if (value !== undefined && value !== null) {
          query.append(key, String(value))
        }
      })

      const url = `${CONTRACT_EMPLOYEES}?${query.toString()}`
      const resp = await axiosInstance.get(url)
      return resp.data as ListContractEmployeesResponse
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch contract employees failed')
    }
  }
)
