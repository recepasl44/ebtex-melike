import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { STUDENTS } from '../../../helpers/url_helper';
import { RegisterNoResponse } from '../../../types/student/registerNo';

export const fetchRegisterNo = createAsyncThunk<
  RegisterNoResponse,
  { school_id: number; branche_id: number },
  { rejectValue: string }
>(
  'student/registerNo/fetchRegisterNo',
  async ({ school_id, branche_id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${STUDENTS}/register-no?school_id=${school_id}&branche_id=${branche_id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch register no failed');
    }
  }
);
