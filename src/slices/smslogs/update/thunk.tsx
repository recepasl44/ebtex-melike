import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SMS_LOGS } from '../../../helpers/url_helper';
import { UpdateSmsLogPayload } from '../../../types/smslogs/update';
import { SmsLog } from '../../../types/smslogs/list';

export const updateSmsLog = createAsyncThunk<SmsLog, UpdateSmsLogPayload, { rejectValue: string }>(
  'smslogs/update',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${SMS_LOGS}/${id}`, body);
      return resp.data.data as SmsLog;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update sms log failed');
    }
  }
);
