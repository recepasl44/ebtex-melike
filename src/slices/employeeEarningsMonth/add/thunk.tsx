import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS_MONTH } from '../../../helpers/url_helper'
import { EmployeeEarningsMonthAddPayload } from '../../../types/employeeEarningsMonth/add'
import { EmployeeEarningsMonthData } from '../../../types/employeeEarningsMonth/list'

export const addEmployeeEarningsMonth = createAsyncThunk<EmployeeEarningsMonthData, EmployeeEarningsMonthAddPayload>(
  'employeeEarningsMonth/add',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(EMPLOYEE_EARNINGS_MONTH, payload)
      return resp.data.data as EmployeeEarningsMonthData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add employee earnings month failed')
    }
  }
)
