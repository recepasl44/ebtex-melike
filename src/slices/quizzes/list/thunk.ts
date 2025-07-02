import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUIZZES } from '../../../helpers/url_helper';
import { QuizzesListArg, QuizzesListResponse } from '../../../types/quizzes/list';

export const fetchQuizzes = createAsyncThunk<QuizzesListResponse, QuizzesListArg>(
  'quizzes/fetchQuizzes',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'enabled') {
          query.append(key, String(value));
        }
      });
      const url = `${QUIZZES}?${query.toString()}`;
      const resp = await axiosInstance.get(url);
      return resp.data as QuizzesListResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch quizzes failed');
    }
  }
);
