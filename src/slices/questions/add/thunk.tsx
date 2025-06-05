import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONS } from '../../../helpers/url_helper';
import { QuestionsAddPayload } from '../../../types/questions/add';
import { Question } from '../../../types/questions/list';

export const addQuestion = createAsyncThunk<Question, QuestionsAddPayload>(
  'questions/addQuestion',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(QUESTIONS, payload);
      return response.data.data as Question;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Add question failed');
    }
  }
);
