import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS } from '../../../helpers/url_helper'
import { EmployeeEarningsAddPayload } from '../../../types/employeeEarnings/add'
import { data } from '../../../types/employeeEarnings/list'

export const addEmployeeEarning = createAsyncThunk<data, EmployeeEarningsAddPayload>(
  'employeeEarnings/addEmployeeEarning',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(EMPLOYEE_EARNINGS, payload)
      return resp.data.data as data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add employee earning failed')
    }
  }
)
