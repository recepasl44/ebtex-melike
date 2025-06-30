import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS } from '../../../helpers/url_helper'
import { EmployeeEarningsUpdatePayload } from '../../../types/employeeEarnings/update'
import { data } from '../../../types/employeeEarnings/list'

export const updateEmployeeEarning = createAsyncThunk<data, EmployeeEarningsUpdatePayload>(
  'employeeEarnings/updateEmployeeEarning',
  async ({ employeeId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${EMPLOYEE_EARNINGS}/${employeeId}`, payload)
      return resp.data.data as data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update employee earning failed')
    }
  }
)
