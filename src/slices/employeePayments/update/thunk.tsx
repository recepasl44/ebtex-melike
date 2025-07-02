import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_PAYMENTS } from '../../../helpers/url_helper'
import { EmployeePaymentUpdatePayload } from '../../../types/employeePayments/update'
import { EmployeePaymentItem } from '../../../types/employeePayments/list'

export const updateEmployeePayment = createAsyncThunk<EmployeePaymentItem, EmployeePaymentUpdatePayload>(
  'employeePayments/updateEmployeePayment',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${EMPLOYEE_PAYMENTS}/${id}`, payload)
      return resp.data.data as EmployeePaymentItem
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update employee payment failed')
    }
  }
)
