import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SMS_LOGS } from '../../../helpers/url_helper';
import { SmsLogsListResponse, SmsLogsListArg } from '../../../types/smslogs/list';

export const fetchSmsLogs = createAsyncThunk<
  SmsLogsListResponse,
  SmsLogsListArg,
  { rejectValue: string }
>('smslogs/list', async (queryParams, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'enabled') {
        query.append(key, String(value));
      }
    });
    const url = `${SMS_LOGS}?${query.toString()}`;
    const resp = await axiosInstance.get(url);
    return resp.data as SmsLogsListResponse;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Fetch sms logs failed');
  }
});
