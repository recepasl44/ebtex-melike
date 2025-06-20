import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { BULLETINS } from '../../../helpers/url_helper';
import { BulletinsUpdatePayload } from '../../../types/bulletins/update';
import { data } from '../../../types/bulletins/list';

export const updateBulletin = createAsyncThunk<data, BulletinsUpdatePayload>(
  'bulletins/updateBulletin',
  async ({ bulletinId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${BULLETINS}/${bulletinId}`, payload);
      return resp.data.data as data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update bulletin failed');
    }
  }
);
