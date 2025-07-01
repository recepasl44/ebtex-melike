import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_EARNINGS_MONTH } from '../../../helpers/url_helper'
import {
  EmployeeEarningsMonthListResponse,
  EmployeeEarningsMonthListArgs,
} from '../../../types/employeeEarningsMonth/list'

export const fetchEmployeeEarningsMonthList = createAsyncThunk<EmployeeEarningsMonthListResponse, EmployeeEarningsMonthListArgs>(
  'employeeEarningsMonth/fetchList',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams()
      Object.entries(queryParams).forEach(([key, value]) => {
        if (key === 'enabled') return
        if (value !== undefined && value !== null) {
          query.append(key, String(value))
        }
      })
      const url = `${EMPLOYEE_EARNINGS_MONTH}?${query.toString()}`
      const resp = await axiosInstance.get(url)

      const res = resp.data

      if (Array.isArray(res?.data)) {
        return {
          rows: res.data,
          meta: {
            total: res.total ?? res.data.length,
            last_page: res.last_page ?? 1,
            current_page: res.current_page ?? 1,
          },
        } as EmployeeEarningsMonthListResponse
      }

      if (Array.isArray(res)) {
        return {
          rows: res,
          meta: { total: res.length, last_page: 1, current_page: 1 },
        } as EmployeeEarningsMonthListResponse
      }

      return {
        rows: [],
        meta: { total: 0, last_page: 1, current_page: 1 },
      } as EmployeeEarningsMonthListResponse
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ||
          'Fetch employee earnings month list failed'
      )
    }
  }
)
