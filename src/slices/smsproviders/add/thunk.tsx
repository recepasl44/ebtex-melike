import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SMS_PROVIDERS } from '../../../helpers/url_helper';
import { AddSmsProviderPayload } from '../../../types/smsproviders/add';
import { SmsProvider } from '../../../types/smsproviders/list';

export const addSmsProvider = createAsyncThunk<SmsProvider, AddSmsProviderPayload, { rejectValue: string }>(
  'smsproviders/add',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(SMS_PROVIDERS, payload);
      return resp.data.data as SmsProvider;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add sms provider failed');
    }
  }
);
