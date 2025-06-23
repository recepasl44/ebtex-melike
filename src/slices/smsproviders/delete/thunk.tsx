import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { SMS_PROVIDERS } from '../../../helpers/url_helper';
import { DeleteSmsProviderPayload } from '../../../types/smsproviders/delete';

export const deleteSmsProvider = createAsyncThunk<{ deletedId: number }, DeleteSmsProviderPayload, { rejectValue: string }>(
  'smsproviders/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${SMS_PROVIDERS}/${id}`);
      return { deletedId: id };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete sms provider failed');
    }
  }
);
