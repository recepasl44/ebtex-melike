import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUIZZES } from '../../../helpers/url_helper';
import { QuizzesDeleteResponse } from '../../../types/quizzes/delete';

export const deleteQuiz = createAsyncThunk<QuizzesDeleteResponse, number>(
  'quizzes/deleteQuiz',
  async (quizId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${QUIZZES}/${quizId}`);
      return resp.data as QuizzesDeleteResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete quiz failed');
    }
  }
);
