import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS_PERIOD } from '../../../helpers/url_helper'
import { EmployeeEarningsPeriodData } from '../../../types/employeeEarningsPeriod/list'

export const fetchEmployeeEarningsPeriod = createAsyncThunk<EmployeeEarningsPeriodData, number>(
  'employeeEarningsPeriod/fetchDetail',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${EMPLOYEE_EARNINGS_PERIOD}/${id}`)
      return resp.data.data as EmployeeEarningsPeriodData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch employee earnings period failed')
    }
  }
)
