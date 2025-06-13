import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QuestionsUpdatePayload } from '../../../types/questions/update';
import { Question } from '../../../types/questions/list';

export const updateQuestion = createAsyncThunk<Question, QuestionsUpdatePayload>(
  'questions/updateQuestion',
  async ({ questionId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`/api/v1/questions/${questionId}`, payload);
      return resp.data.data as Question;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update question failed');
    }
  }
);
