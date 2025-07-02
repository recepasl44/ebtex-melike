import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_PAYMENTS } from '../../../helpers/url_helper'
import { EmployeePaymentShowState } from '../../../types/employeePayments/detail'

export const fetchEmployeePayment = createAsyncThunk<EmployeePaymentShowState, number>(
  'employeePayments/fetchEmployeePayment',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${EMPLOYEE_PAYMENTS}/${id}`)
      return response.data.data as EmployeePaymentShowState
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fetch employee payment failed')
    }
  }
)
