import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONS } from '../../../helpers/url_helper';
import { QuestionShowState } from '../../../types/questions/detail';

export const fetchQuestion = createAsyncThunk<QuestionShowState, number>(
  'questions/fetchQuestion',
  async (questionId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${QUESTIONS}/${questionId}`);
      return response.data.data as QuestionShowState;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fetch question failed');
    }
  }
);
