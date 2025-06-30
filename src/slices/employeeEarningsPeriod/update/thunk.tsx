import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS_PERIOD } from '../../../helpers/url_helper'
import { EmployeeEarningsPeriodUpdatePayload } from '../../../types/employeeEarningsPeriod/update'
import { EmployeeEarningsPeriodData } from '../../../types/employeeEarningsPeriod/list'

export const updateEmployeeEarningsPeriod = createAsyncThunk<EmployeeEarningsPeriodData, EmployeeEarningsPeriodUpdatePayload>(
  'employeeEarningsPeriod/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${EMPLOYEE_EARNINGS_PERIOD}/${id}`, payload)
      return resp.data.data as EmployeeEarningsPeriodData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update employee earnings period failed')
    }
  }
)
