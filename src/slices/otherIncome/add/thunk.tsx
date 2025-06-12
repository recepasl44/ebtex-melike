import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { OTHER_INCOME } from '../../../helpers/url_helper';
import { OtherIncomeAddPayload } from '../../../types/otherIncome/add';
import { OtherIncomeData } from '../../../types/otherIncome/list';

export const addOtherIncome = createAsyncThunk<OtherIncomeData, OtherIncomeAddPayload>(
  'otherIncome/add',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(OTHER_INCOME, payload);
      return resp.data.data as OtherIncomeData;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add other income failed');
    }
  }
);
