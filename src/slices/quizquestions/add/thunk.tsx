import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUIZQUESTIONS } from '../../../helpers/url_helper';
import { QuizQuestionsListItem } from '../../../types/quizquestions/list';
import { QuizQuestionsAddPayload } from '../../../types/quizquestions/add';

export const addQuizQuestion = createAsyncThunk<QuizQuestionsListItem, QuizQuestionsAddPayload>(
  'quizquestions/addQuizQuestion',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(QUIZQUESTIONS, payload);
      return response.data.data as QuizQuestionsListItem;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Add quiz question failed');
    }
  }
);
