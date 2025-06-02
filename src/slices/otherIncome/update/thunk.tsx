import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { OTHER_INCOME } from '../../../helpers/url_helper';
import { OtherIncomeUpdatePayload } from '../../../types/otherIncome/update';
import { OtherIncomeData } from '../../../types/otherIncome/list';

export const updateOtherIncome = createAsyncThunk<OtherIncomeData, OtherIncomeUpdatePayload>(
  'otherIncome/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${OTHER_INCOME}/${id}`, payload);
      return resp.data.data as OtherIncomeData;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update other income failed');
    }
  }
);
