import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUIZQUESTIONS } from '../../../helpers/url_helper';
import { QuizQuestionsUpdatePayload } from '../../../types/quizquestions/update';
import { QuizQuestionsListItem } from '../../../types/quizquestions/list';

export const updateQuizQuestion = createAsyncThunk<QuizQuestionsListItem, QuizQuestionsUpdatePayload>(
  'quizquestions/updateQuizQuestion',
  async ({ quizQuestionId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${QUIZQUESTIONS}/${quizQuestionId}`, payload);
      return response.data.data as QuizQuestionsListItem;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Update quiz question failed');
    }
  }
);
