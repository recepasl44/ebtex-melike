import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { STUDENTS } from '../../../helpers/url_helper';
import { StudentStep3Payload, StudentStep3Response } from '../../../types/student/step3';

export const saveStudentStep3 = createAsyncThunk<
  StudentStep3Response,
  { studentId: number; payload: StudentStep3Payload },
  { rejectValue: string }
>(
  'student/step3/saveStudentStep3',
  async ({ studentId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${STUDENTS}/${studentId}`, payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Save student step3 failed');
    }
  }
);
