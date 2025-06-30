import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { EMPLOYEE_EARNINGS_MONTH } from '../../../helpers/url_helper';
import { EmployeeEarningsMonthAddPayload } from '../../../types/employeeEarningsMonth/add';
import { EmployeeMonth } from '../../../types/employeeEarningsMonth/list';

export const addEmployeeEarningsMonth = createAsyncThunk<EmployeeMonth, EmployeeEarningsMonthAddPayload>(
  'employeeEarningsMonth/add',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(EMPLOYEE_EARNINGS_MONTH, payload);
      return resp.data.data as EmployeeMonth;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add employee monthly earning failed');
    }
  }
);
