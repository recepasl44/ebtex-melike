import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS } from '../../../helpers/url_helper'
import { EmployeeEarningsDeleteState } from '../../../types/employeeEarnings/delete'

export const deleteEmployeeEarning = createAsyncThunk<EmployeeEarningsDeleteState, number>(
  'employeeEarnings/deleteEmployeeEarning',
  async (employeeId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${EMPLOYEE_EARNINGS}/${employeeId}`)
      return resp.data as EmployeeEarningsDeleteState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete employee earning failed')
    }
  }
)
