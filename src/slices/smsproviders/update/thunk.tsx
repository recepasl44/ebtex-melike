import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SMS_PROVIDERS } from '../../../helpers/url_helper';
import { UpdateSmsProviderPayload } from '../../../types/smsproviders/update';
import { SmsProvider } from '../../../types/smsproviders/list';

export const updateSmsProvider = createAsyncThunk<SmsProvider, UpdateSmsProviderPayload, { rejectValue: string }>(
  'smsproviders/update',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${SMS_PROVIDERS}/${id}`, body);
      return resp.data.data as SmsProvider;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update sms provider failed');
    }
  }
);
