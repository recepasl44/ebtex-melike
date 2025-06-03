import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { STUDENTS } from '../../../helpers/url_helper';
import { StudentStep4Payload, StudentStep4Response } from '../../../types/student/step4';

export const completeStudentContract = createAsyncThunk<
  StudentStep4Response,
  { studentId: number; payload: StudentStep4Payload },
  { rejectValue: string }
>(
  'student/step4/completeStudentContract',
  async ({ studentId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${STUDENTS}/${studentId}`, payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Complete student contract failed');
    }
  }
);
