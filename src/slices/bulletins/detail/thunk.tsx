import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { BULLETINS } from '../../../helpers/url_helper';
import { BulletinShowState } from '../../../types/bulletins/detail';

export const fetchBulletin = createAsyncThunk<BulletinShowState, number>(
  'bulletins/fetchBulletin',
  async (bulletinId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${BULLETINS}/${bulletinId}`);
      return resp.data.data as BulletinShowState;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch bulletin failed');
    }
  }
);
