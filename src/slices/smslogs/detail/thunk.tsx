import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SMS_LOGS } from '../../../helpers/url_helper';
import { SmsLog } from '../../../types/smslogs/list';

export const fetchSmsLog = createAsyncThunk<SmsLog, number, { rejectValue: string }>(
  'smslogs/detail',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SMS_LOGS}/${id}`);
      return resp.data.data as SmsLog;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch sms log failed');
    }
  }
);
