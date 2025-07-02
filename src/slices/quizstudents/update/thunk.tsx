import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QuizStudentsUpdatePayload } from '../../../types/quizstudents/update';
import { QuizStudentData } from '../../../types/quizstudents/list';

export const QUIZSTUDENTS = '/quizstudents';

export const updateQuizStudent = createAsyncThunk<QuizStudentData, QuizStudentsUpdatePayload>(
  'quizstudents/updateQuizStudent',
  async ({ quizStudentId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${QUIZSTUDENTS}/${quizStudentId}`, payload);
      return resp.data.data as QuizStudentData;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update quiz student failed');
    }
  }
);
