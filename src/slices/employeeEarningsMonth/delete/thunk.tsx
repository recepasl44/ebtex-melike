import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS_MONTH } from '../../../helpers/url_helper'
import { EmployeeEarningsMonthDeletePayload } from '../../../types/employeeEarningsMonth/delete'
import { EmployeeEarningsMonthData } from '../../../types/employeeEarningsMonth/list'

export const deleteEmployeeEarningsMonth = createAsyncThunk<EmployeeEarningsMonthData, EmployeeEarningsMonthDeletePayload['id']>(
  'employeeEarningsMonth/delete',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${EMPLOYEE_EARNINGS_MONTH}/${id}`)
      return resp.data as EmployeeEarningsMonthData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete employee earnings month failed')
    }
  }
)
