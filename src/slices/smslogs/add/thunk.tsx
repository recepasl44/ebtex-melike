import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SMS_LOGS } from '../../../helpers/url_helper';
import { AddSmsLogPayload } from '../../../types/smslogs/add';
import { SmsLog } from '../../../types/smslogs/list';

export const addSmsLog = createAsyncThunk<SmsLog, AddSmsLogPayload, { rejectValue: string }>(
  'smslogs/add',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(SMS_LOGS, payload);
      return resp.data.data as SmsLog;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add sms log failed');
    }
  }
);
