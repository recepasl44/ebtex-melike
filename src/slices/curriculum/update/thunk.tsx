import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CURRICULUM } from '../../../helpers/url_helper';
import { CurriculumUpdatePayload } from '../../../types/curriculum/update';
import { CurriculumData } from '../../../types/curriculum/list';

export const updateCurriculum = createAsyncThunk<CurriculumData, CurriculumUpdatePayload>(
  'curriculum/updateCurriculum',
  async ({ curriculumId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${CURRICULUM}/${curriculumId}`, payload);
      return response.data.data as CurriculumData;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update curriculum failed');
    }
  }
);
