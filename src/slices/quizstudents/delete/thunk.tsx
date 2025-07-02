import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUIZSTUDENTS } from '../update/thunk';
import { QuizStudentsDeleteState } from '../../../types/quizstudents/delete';

export const deleteQuizStudent = createAsyncThunk<QuizStudentsDeleteState, number>(
  'quizstudents/deleteQuizStudent',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${QUIZSTUDENTS}/${id}`);
      return resp.data as QuizStudentsDeleteState;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete quiz student failed');
    }
  }
);
