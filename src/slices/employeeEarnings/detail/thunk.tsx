import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS } from '../../../helpers/url_helper'
import { EmployeeEarningShowState } from '../../../types/employeeEarnings/detail'

export const fetchEmployeeEarning = createAsyncThunk<EmployeeEarningShowState, number>(
  'employeeEarnings/fetchEmployeeEarning',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${EMPLOYEE_EARNINGS}/${employeeId}`)
      return response.data.data as EmployeeEarningShowState
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fetch employee earning failed')
    }
  }
)
