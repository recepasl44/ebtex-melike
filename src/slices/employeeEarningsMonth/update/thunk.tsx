import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS_MONTH } from '../../../helpers/url_helper'
import { EmployeeEarningsMonthUpdatePayload } from '../../../types/employeeEarningsMonth/update'
import { EmployeeEarningsMonthData } from '../../../types/employeeEarningsMonth/list'

export const updateEmployeeEarningsMonth = createAsyncThunk<EmployeeEarningsMonthData, EmployeeEarningsMonthUpdatePayload>(
  'employeeEarningsMonth/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${EMPLOYEE_EARNINGS_MONTH}/${id}`, payload)
      return resp.data.data as EmployeeEarningsMonthData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update employee earnings month failed')
    }
  }
)
