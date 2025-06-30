import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { EMPLOYEE_EARNINGS_MONTH } from '../../../helpers/url_helper';
import { EmployeeEarningsMonthDetailState } from '../../../types/employeeEarningsMonth/detail';

export const fetchEmployeeEarningsMonthDetail = createAsyncThunk<EmployeeEarningsMonthDetailState['data'], number>(
  'employeeEarningsMonth/fetchDetail',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${EMPLOYEE_EARNINGS_MONTH}/${id}`);
      return resp.data.data as EmployeeEarningsMonthDetailState['data'];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch employee monthly earning failed');
    }
  }
);
