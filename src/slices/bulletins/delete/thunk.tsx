import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { BULLETINS } from '../../../helpers/url_helper';
import { BulletinsDeleteState } from '../../../types/bulletins/delete';

export const deleteBulletin = createAsyncThunk<BulletinsDeleteState, number>(
  'bulletins/deleteBulletin',
  async (bulletinId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${BULLETINS}/${bulletinId}`);
      return resp.data as BulletinsDeleteState;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete bulletin failed');
    }
  }
);
