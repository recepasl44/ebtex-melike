import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { LEVELS } from '../../../helpers/url_helper';
import { LevelUpdatePayload } from '../../../types/levels/update';
import { LevelData } from '../../../types/levels/list';
export const updateLevel = createAsyncThunk<LevelData, LevelUpdatePayload>(
  'levels/updateLevel',
  async ({ levelId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${LEVELS}/${levelId}`, payload);
      return response.data.data as LevelData;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update level failed');
    }
  }
);
