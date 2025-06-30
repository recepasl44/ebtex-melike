import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS } from '../../../helpers/url_helper'
import { ListEmployeeEarningsResponse, EarningListArg } from '../../../types/employeeEarnings/list'

export const fetchEmployeeEarnings = createAsyncThunk<ListEmployeeEarningsResponse, EarningListArg>(
  'employeeEarnings/fetchEmployeeEarnings',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams()

      Object.entries(queryParams).forEach(([key, value]) => {
        if (key === 'enabled') return
        if (value !== undefined && value !== null) {
          query.append(key, String(value))
        }
      })

      const url = `${EMPLOYEE_EARNINGS}?${query.toString()}`
      const resp = await axiosInstance.get(url)
      return resp.data as ListEmployeeEarningsResponse
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch employee earnings failed')
    }
  }
)
