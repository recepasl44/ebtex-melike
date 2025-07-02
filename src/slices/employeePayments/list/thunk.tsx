import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_PAYMENTS } from '../../../helpers/url_helper'
import { EmployeePaymentListResponse, EmployeePaymentListArg } from '../../../types/employeePayments/list'

export const fetchEmployeePayments = createAsyncThunk<EmployeePaymentListResponse, EmployeePaymentListArg>(
  'employeePayments/fetchEmployeePayments',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams()
      Object.entries(queryParams).forEach(([key, value]) => {
        if (key === 'enabled') return
        if (value !== undefined && value !== null) {
          query.append(key, String(value))
        }
      })
      const url = `${EMPLOYEE_PAYMENTS}?${query.toString()}`
      const resp = await axiosInstance.get(url)
      return resp.data as EmployeePaymentListResponse
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch employee payments failed')
    }
  }
)
