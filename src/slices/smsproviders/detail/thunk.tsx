import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SMS_PROVIDERS } from '../../../helpers/url_helper';
import { SmsProvider } from '../../../types/smsproviders/list';

export const fetchSmsProvider = createAsyncThunk<SmsProvider, number, { rejectValue: string }>(
  'smsproviders/detail',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SMS_PROVIDERS}/${id}`);
      return resp.data.data as SmsProvider;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch sms provider failed');
    }
  }
);
