import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CURRICULUM } from '../../../helpers/url_helper';
import { CurriculumListResponse, CurriculumListArg } from '../../../types/curriculum/list';

export const fetchLevels = createAsyncThunk<CurriculumListResponse, CurriculumListArg>(
  'curriculum/fetchLevels',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      const queryString = query.toString();
      const response = await axiosInstance.get(`${CURRICULUM}?${queryString}`);
      return response.data as CurriculumListResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch curriculum failed');
    }
  }
);
