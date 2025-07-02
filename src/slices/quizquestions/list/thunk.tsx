import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUIZQUESTIONS } from '../../../helpers/url_helper';
import { QuizQuestionsResponse, QuizQuestionsListArg } from '../../../types/quizquestions/list';

export const fetchQuizQuestions = createAsyncThunk<QuizQuestionsResponse, QuizQuestionsListArg>(
  'quizquestions/fetchQuizQuestions',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const queryString = query.toString();
      const url = `${QUIZQUESTIONS}?${queryString}`;
      const response = await axiosInstance.get(url);
      return response.data as QuizQuestionsResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fetch quiz questions failed');
    }
  }
);
