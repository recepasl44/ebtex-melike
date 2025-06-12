import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { STUDENTS } from '../../../helpers/url_helper';
import { StudentImportPayload, StudentImportResponse } from '../../../types/student/import';

export const importStudents = createAsyncThunk<
  StudentImportResponse,
  StudentImportPayload,
  { rejectValue: string }
>(
  'student/import/importStudents',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('student_import', payload.student_import);
      const response = await axiosInstance.post(`${STUDENTS}/imports`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Student import failed');
    }
  }
);
