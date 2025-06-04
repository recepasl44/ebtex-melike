import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { OTHER_INCOME } from '../../../helpers/url_helper';
import { OtherIncomeListResponse, OtherIncomeListArgs } from '../../../types/otherIncome/list';

export const fetchOtherIncomes = createAsyncThunk<OtherIncomeListResponse, OtherIncomeListArgs>(
  'otherIncome/fetchOtherIncomes',
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const response = await axiosInstance.get(`${OTHER_INCOME}?${query.toString()}`);
      return response.data as OtherIncomeListResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch other incomes failed');
    }
  }
);
