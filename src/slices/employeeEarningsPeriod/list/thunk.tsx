import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS_PERIOD } from '../../../helpers/url_helper'
import { EmployeeEarningsPeriodListResponse, EmployeeEarningsPeriodListArgs } from '../../../types/employeeEarningsPeriod/list'

export const fetchEmployeeEarningsPeriodList = createAsyncThunk<EmployeeEarningsPeriodListResponse, EmployeeEarningsPeriodListArgs>(
  'employeeEarningsPeriod/fetchList',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams()
      Object.entries(queryParams).forEach(([key, value]) => {
        if (key === 'enabled') return
        if (value !== undefined && value !== null) {
          query.append(key, String(value))
        }
      })
      const url = `${EMPLOYEE_EARNINGS_PERIOD}?${query.toString()}`
      const resp = await axiosInstance.get(url)
      return resp.data as EmployeeEarningsPeriodListResponse
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch employee earnings period list failed')
    }
  }
)
