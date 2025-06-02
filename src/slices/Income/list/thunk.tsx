import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { INCOMES } from '../../../helpers/url_helper';
import { ListIncomeResponse,IncomeListArgs } from '../../../types/income/list';

export const fetchIncomes = createAsyncThunk<ListIncomeResponse, IncomeListArgs>(
  'income/fetchIncomes',
  async (params, { rejectWithValue }) => {
    try {
    
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value)); 
        }
      });
      const response = await axiosInstance.get(`${INCOMES}?${query.toString()}`);
      return response.data as ListIncomeResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch incomes failed');
    }
  }
);
