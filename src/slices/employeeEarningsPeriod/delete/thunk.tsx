import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS_PERIOD } from '../../../helpers/url_helper'
import { EmployeeEarningsPeriodDeletePayload } from '../../../types/employeeEarningsPeriod/delete'
import { EmployeeEarningsPeriodData } from '../../../types/employeeEarningsPeriod/list'

export const deleteEmployeeEarningsPeriod = createAsyncThunk<EmployeeEarningsPeriodData, EmployeeEarningsPeriodDeletePayload['id']>(
  'employeeEarningsPeriod/delete',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${EMPLOYEE_EARNINGS_PERIOD}/${id}`)
      return resp.data as EmployeeEarningsPeriodData
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete employee earnings period failed')
    }
  }
)
