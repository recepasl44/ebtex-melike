import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SMS_LOGS } from '../../../helpers/url_helper';
import { DeleteSmsLogPayload } from '../../../types/smslogs/delete';

export const deleteSmsLog = createAsyncThunk<{ deletedId: number }, DeleteSmsLogPayload, { rejectValue: string }>(
  'smslogs/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${SMS_LOGS}/${id}`);
      return { deletedId: id };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete sms log failed');
    }
  }
);
