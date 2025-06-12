import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { STUDENTS } from '../../../helpers/url_helper';
import { AddStudentPayload, AddStudentResponse } from '../../../types/student/add';

export const addStudent = createAsyncThunk<
  AddStudentResponse,
  AddStudentPayload,
  { rejectValue: string }
>(
  'student/add/addStudent',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(STUDENTS, payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add student failed');
    }
  }
);
