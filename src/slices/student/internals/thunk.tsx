import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { STUDENTS } from '../../../helpers/url_helper';
import { StudentInternalsResponse } from '../../../types/student/internals';

export const fetchStudentInternals = createAsyncThunk<
  StudentInternalsResponse,
  { school_id: number; branche_id: number },
  { rejectValue: string }
>(
  'student/internals/fetchStudentInternals',
  async ({ school_id, branche_id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${STUDENTS}/internals?school_id=${school_id}&branche_id=${branche_id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch student internals failed');
    }
  }
);
