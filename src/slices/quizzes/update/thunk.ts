import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUIZZES } from '../../../helpers/url_helper';
import { QuizzesUpdatePayload, QuizzesUpdateResponse } from '../../../types/quizzes/update';

export const updateQuiz = createAsyncThunk<QuizzesUpdateResponse, QuizzesUpdatePayload>(
  'quizzes/updateQuiz',
  async ({ quizId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${QUIZZES}/${quizId}`, payload);
      return resp.data as QuizzesUpdateResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update quiz failed');
    }
  }
);
