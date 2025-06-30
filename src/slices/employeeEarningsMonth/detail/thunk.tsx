import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS_MONTH } from '../../../helpers/url_helper'
import { EmployeeEarningsMonthData } from '../../../types/employeeEarningsMonth/list'

export const fetchEmployeeEarningsMonth = createAsyncThunk<EmployeeEarningsMonthData, number>(
  'employeeEarningsMonth/fetchDetail',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${EMPLOYEE_EARNINGS_MONTH}/${id}`)
      return resp.data.data as EmployeeEarningsMonthData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch employee earnings month failed')
    }
  }
)
