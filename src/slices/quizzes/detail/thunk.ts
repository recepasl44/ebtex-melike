import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUIZZES } from '../../../helpers/url_helper';
import { QuizListItem } from '../../../types/quizzes/list';

export const fetchQuiz = createAsyncThunk<QuizListItem, number>(
  'quizzes/fetchQuiz',
  async (quizId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${QUIZZES}/${quizId}`);
      return resp.data.data as QuizListItem;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch quiz failed');
    }
  }
);
