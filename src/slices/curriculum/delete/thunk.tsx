
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CURRICULUM } from '../../../helpers/url_helper';
import { CurriculumDeleteState } from '../../../types/curriculum/delete';

export const deleteCurriculum = createAsyncThunk<CurriculumDeleteState, number>(
  'curriculum/deleteCurriculum',
  async (curriculumId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${CURRICULUM}/${curriculumId}`);
      return response.data as CurriculumDeleteState;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete curriculum failed');
    }
  }
);
