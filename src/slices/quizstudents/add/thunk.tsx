import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QuizStudentsAddPayload } from '../../../types/quizstudents/add';
import { QuizStudentData } from '../../../types/quizstudents/list';
import { QUIZSTUDENTS } from '../update/thunk';

export const addQuizStudent = createAsyncThunk<QuizStudentData, QuizStudentsAddPayload>(
  'quizstudents/addQuizStudent',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(QUIZSTUDENTS, payload);
      return resp.data.data as QuizStudentData;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add quiz student failed');
    }
  }
);
