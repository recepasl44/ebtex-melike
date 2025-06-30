import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { EMPLOYEE_EARNINGS_MONTH } from '../../../helpers/url_helper';
import { EmployeeEarningsMonthDeleteState } from '../../../types/employeeEarningsMonth/delete';

export const deleteEmployeeEarningsMonth = createAsyncThunk<EmployeeEarningsMonthDeleteState, number>(
  'employeeEarningsMonth/delete',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${EMPLOYEE_EARNINGS_MONTH}/${id}`);
      return resp.data as EmployeeEarningsMonthDeleteState;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete employee monthly earning failed');
    }
  }
);
