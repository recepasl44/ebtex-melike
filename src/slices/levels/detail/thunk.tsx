import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { LEVELS } from '../../../helpers/url_helper';
import { LevelDetailState } from '../../../types/levels/detail';
export const fetchLevelDetail = createAsyncThunk<LevelDetailState, number>(
  'levels/fetchLevelDetail',
  async (levelId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${LEVELS}/${levelId}`);
      return response.data.data as LevelDetailState;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch level detail failed');
    }
  }
);
