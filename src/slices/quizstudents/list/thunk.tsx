import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { ListQuizStudentsResponse, QuizStudentsListArg } from '../../../types/quizstudents/list';
import { QUIZSTUDENTS } from '../update/thunk';

export const fetchQuizStudents = createAsyncThunk<ListQuizStudentsResponse, QuizStudentsListArg>(
  'quizstudents/fetchQuizStudents',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value != null) query.append(key, String(value));
      });
      const url = `${QUIZSTUDENTS}?${query.toString()}`;
      const resp = await axiosInstance.get(url);
      return resp.data as ListQuizStudentsResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch quiz students failed');
    }
  }
);
