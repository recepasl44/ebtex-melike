import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS_PERIOD } from '../../../helpers/url_helper'
import { EmployeeEarningsPeriodAddPayload } from '../../../types/employeeEarningsPeriod/add'
import { EmployeeEarningsPeriodData } from '../../../types/employeeEarningsPeriod/list'

export const addEmployeeEarningsPeriod = createAsyncThunk<EmployeeEarningsPeriodData, EmployeeEarningsPeriodAddPayload>(
  'employeeEarningsPeriod/add',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(EMPLOYEE_EARNINGS_PERIOD, payload)
      return resp.data.data as EmployeeEarningsPeriodData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add employee earnings period failed')
    }
  }
)
