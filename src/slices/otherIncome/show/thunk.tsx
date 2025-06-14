import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { OTHER_INCOME } from '../../../helpers/url_helper';
import { OtherIncomeData } from '../../../types/otherIncome/list';

export const showOtherIncome = createAsyncThunk<OtherIncomeData, number>(
  'otherIncome/show',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${OTHER_INCOME}/${id}`);
      return resp.data.data as OtherIncomeData;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Show other income failed');
    }
  }
);
