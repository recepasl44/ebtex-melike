import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { LEVELS } from '../../../helpers/url_helper';
import { LevelAddPayload } from '../../../types/levels/add';
import { LevelData } from '../../../types/levels/list';
export const addLevel = createAsyncThunk<LevelData, LevelAddPayload>(
  'levels/addLevel',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(LEVELS, payload);
      return response.data.data as LevelData;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add level failed');
    }
  }
);
