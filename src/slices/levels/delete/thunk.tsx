import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { LEVELS } from '../../../helpers/url_helper';
import { LevelDeleteState } from '../../../types/levels/delete';
export const deleteLevel = createAsyncThunk<LevelDeleteState, number>(
  'levels/deleteLevel',
  async (levelId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${LEVELS}/${levelId}`);
      return response.data as LevelDeleteState;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete level failed');
    }
  }
);
