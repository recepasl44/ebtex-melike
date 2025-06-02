
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { LEVELS } from '../../../helpers/url_helper';
import { ListLevelResponse, LevelListArg } from '../../../types/levels/list';
export const fetchLevels = createAsyncThunk<ListLevelResponse, LevelListArg>(
  'levels/fetchLevels',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const queryString = query.toString();
      const response = await axiosInstance.get(`${LEVELS}?${queryString}`);
      return response.data as ListLevelResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch levels failed');
    }
  }
);
