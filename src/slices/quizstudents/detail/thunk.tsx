import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUIZSTUDENTS } from '../update/thunk';
import { QuizStudentData } from '../../../types/quizstudents/list';

export const fetchQuizStudent = createAsyncThunk<QuizStudentData, number>(
  'quizstudents/fetchQuizStudent',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${QUIZSTUDENTS}/${id}`);
      return resp.data.data as QuizStudentData;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch quiz student failed');
    }
  }
);
