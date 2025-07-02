import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUIZQUESTIONS } from '../../../helpers/url_helper';
import { QuizQuestionsListItem } from '../../../types/quizquestions/list';

export const fetchQuizQuestion = createAsyncThunk<QuizQuestionsListItem, number>(
  'quizquestions/detail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${QUIZQUESTIONS}/${id}`);
      return response.data.data as QuizQuestionsListItem;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fetch detail failed');
    }
  }
);
