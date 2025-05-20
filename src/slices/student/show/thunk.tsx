import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { STUDENTS } from '../../../helpers/url_helper';
import { ShowStudentResponse } from '../../../types/student/show';

export const showStudent = createAsyncThunk<
  ShowStudentResponse,
  number,
  { rejectValue: string }
>(
  'student/show/showStudent',
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${STUDENTS}/${studentId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Show student failed');
    }
  }
);
