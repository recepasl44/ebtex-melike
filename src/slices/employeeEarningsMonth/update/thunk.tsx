import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { EMPLOYEE_EARNINGS_MONTH } from '../../../helpers/url_helper';
import { EmployeeEarningsMonthUpdatePayload } from '../../../types/employeeEarningsMonth/update';
import { EmployeeMonth } from '../../../types/employeeEarningsMonth/list';

export const updateEmployeeEarningsMonth = createAsyncThunk<EmployeeMonth, EmployeeEarningsMonthUpdatePayload>(
  'employeeEarningsMonth/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${EMPLOYEE_EARNINGS_MONTH}/${id}`, payload);
      return resp.data.data as EmployeeMonth;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update employee monthly earning failed');
    }
  }
);
