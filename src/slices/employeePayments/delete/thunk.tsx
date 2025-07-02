import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_PAYMENTS } from '../../../helpers/url_helper'
import { EmployeePaymentDeleteState } from '../../../types/employeePayments/delete'

export const deleteEmployeePayment = createAsyncThunk<EmployeePaymentDeleteState, number>(
  'employeePayments/deleteEmployeePayment',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${EMPLOYEE_PAYMENTS}/${id}`)
      return resp.data as EmployeePaymentDeleteState
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete employee payment failed')
    }
  }
)
