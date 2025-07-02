import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUIZQUESTIONS } from '../../../helpers/url_helper';
import { QuizQuestionsListItem } from '../../../types/quizquestions/list';

export const deleteQuizQuestion = createAsyncThunk<QuizQuestionsListItem, number>(
  'quizquestions/deleteQuizQuestion',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${QUIZQUESTIONS}/${id}`);
      return response.data.data as QuizQuestionsListItem;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Delete quiz question failed');
    }
  }
);
