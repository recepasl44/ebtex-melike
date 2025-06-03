import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { STUDENTS } from '../../../helpers/url_helper';
import { DeleteStudentResponse } from '../../../types/student/delete';

export const deleteStudent = createAsyncThunk<
  DeleteStudentResponse,
  number,
  { rejectValue: string }
>(
  'student/delete/deleteStudent',
  async (studentId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${STUDENTS}/${studentId}`);
      return { data: { id: studentId } };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete student failed');
    }
  }
);
