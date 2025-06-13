import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { STUDENTS } from '../../../helpers/url_helper';
import { StudentStep1Payload, StudentStep1Response } from '../../../types/student/step1';

export const saveStudentStep1 = createAsyncThunk<
  StudentStep1Response,
  { studentId?: number; payload: StudentStep1Payload },
  { rejectValue: string }
>(
  'student/step1/saveStudentStep1',
  async ({ studentId, payload }, { rejectWithValue }) => {
    try {
      if (studentId) {
        const response = await axiosInstance.put(`${STUDENTS}/${studentId}`, payload);
        return response.data;
      } else {
        const response = await axiosInstance.post(STUDENTS, payload);
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Save student step1 failed');
    }
  }
);
