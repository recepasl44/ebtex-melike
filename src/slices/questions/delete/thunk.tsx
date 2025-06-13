import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONS } from '../../../helpers/url_helper';
import { QuestionsDeleteState } from '../../../types/questions/delete';

export const deleteQuestion = createAsyncThunk<QuestionsDeleteState, number>(
  'questions/deleteQuestion',
  async (questionId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${QUESTIONS}/${questionId}`);
      return response.data as QuestionsDeleteState;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Delete question failed');
    }
  }
);
