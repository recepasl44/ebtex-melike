import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SMS_PROVIDERS } from '../../../helpers/url_helper';
import { SmsProvidersListResponse, SmsProvidersListArg } from '../../../types/smsproviders/list';

export const fetchSmsProviders = createAsyncThunk<
  SmsProvidersListResponse,
  SmsProvidersListArg,
  { rejectValue: string }
>('smsproviders/list', async (queryParams, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'enabled') {
        query.append(key, String(value));
      }
    });
    const queryString = query.toString();
    const url = `${SMS_PROVIDERS}?${queryString}`;
    const resp = await axiosInstance.get(url);
    return resp.data as SmsProvidersListResponse;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Fetch sms providers failed');
  }
});
