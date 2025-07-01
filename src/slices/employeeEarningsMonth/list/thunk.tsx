import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS_MONTH } from '../../../helpers/url_helper'
import { EmployeeEarningsMonthListResponse, EmployeeEarningsMonthListArgs } from '../../../types/employeeEarningsMonth/list'

export const fetchEmployeeEarningsMonthList = createAsyncThunk<
  EmployeeEarningsMonthListResponse,
  EmployeeEarningsMonthListArgs
>('employeeEarningsMonth/fetchList', async (queryParams, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams()
    Object.entries(queryParams).forEach(([key, value]) => {
      if (key === 'enabled') return
      if (value !== undefined && value !== null) {
        query.append(key, String(value))
      }
    })
    const url = `${EMPLOYEE_EARNINGS_MONTH}?${query.toString()}`
    const res = await axiosInstance.get(url)
    const rows = Array.isArray(res.data) ? res.data : res.data.data ?? []
    const meta = Array.isArray(res.data)
      ? { total: rows.length, last_page: 1, current_page: 1 }
      : {
          total: res.data.total,
          last_page: res.data.last_page,
          current_page: res.data.current_page
        }
    return { rows, meta }
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || 'Fetch employee earnings month list failed'
    )
  }
})
