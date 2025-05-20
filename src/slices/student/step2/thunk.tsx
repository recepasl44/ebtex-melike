import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { STUDENTS } from '../../../helpers/url_helper';
import { StudentStep2Payload, StudentStep2Response } from '../../../types/student/step2';

export const saveStudentStep2 = createAsyncThunk<
  StudentStep2Response,
  { studentId: number; payload: StudentStep2Payload },
  { rejectValue: string }
>(
  'student/step2/saveStudentStep2',
  async ({ studentId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${STUDENTS}/${studentId}`, payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Save student step2 failed');
    }
  }
);
