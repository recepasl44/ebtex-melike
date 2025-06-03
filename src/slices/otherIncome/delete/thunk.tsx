import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { OTHER_INCOME } from '../../../helpers/url_helper';

export const deleteOtherIncome = createAsyncThunk<number, number>(
  'otherIncome/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${OTHER_INCOME}/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete other income failed');
    }
  }
);
