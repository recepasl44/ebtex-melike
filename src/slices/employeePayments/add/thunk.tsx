import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { EMPLOYEE_PAYMENTS } from '../../../helpers/url_helper'
import { EmployeePaymentAddPayload } from '../../../types/employeePayments/add'
import { EmployeePaymentItem } from '../../../types/employeePayments/list'

export const addEmployeePayment = createAsyncThunk<EmployeePaymentItem, EmployeePaymentAddPayload>(
  'employeePayments/addEmployeePayment',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(EMPLOYEE_PAYMENTS, payload)
      return resp.data.data as EmployeePaymentItem
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add employee payment failed')
    }
  }
)
