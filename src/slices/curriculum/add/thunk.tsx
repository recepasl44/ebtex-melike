
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CURRICULUM } from '../../../helpers/url_helper';
import { CurriculumAddPayload } from '../../../types/curriculum/add';
import { CurriculumData } from '../../../types/curriculum/list';

export const addCurriculum = createAsyncThunk<CurriculumData, CurriculumAddPayload>(
  'curriculum/addCurriculum',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(CURRICULUM, payload);
      return response.data.data as CurriculumData;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add curriculum failed');
    }
  }
);
