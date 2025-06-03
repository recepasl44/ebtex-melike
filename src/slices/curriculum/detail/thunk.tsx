
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CURRICULUM } from '../../../helpers/url_helper';
import { CurriculumDetailState } from '../../../types/curriculum/detail';

export const fetchCurriculumDetail = createAsyncThunk<CurriculumDetailState, number>(
  'curriculum/fetchCurriculumDetail',
  async (curriculumId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${CURRICULUM}/${curriculumId}`);
      return response.data.data as CurriculumDetailState;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch curriculum detail failed');
    }
  }
);
