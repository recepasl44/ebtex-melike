import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUIZZES } from '../../../helpers/url_helper';
import { QuizzesAddPayload, QuizzesAddResponse } from '../../../types/quizzes/add';

export const addQuiz = createAsyncThunk<QuizzesAddResponse, QuizzesAddPayload>(
  'quizzes/addQuiz',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(QUIZZES, payload);
      return resp.data as QuizzesAddResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add quiz failed');
    }
  }
);
