import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { BULLETINS } from '../../../helpers/url_helper';
import { BulletinsAddPayload } from '../../../types/bulletins/add';
import { data } from '../../../types/bulletins/list';

export const addBulletin = createAsyncThunk<data, BulletinsAddPayload>(
  'bulletins/addBulletin',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(BULLETINS, payload);
      return resp.data.data as data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add bulletin failed');
    }
  }
);
