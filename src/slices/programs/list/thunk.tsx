// src/slices/programs/list/thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';  // API client
import { PROGRAMS } from '../../../helpers/url_helper'; 
import { ListProgramResponse, ProgramListArg } from '../../../types/programs/list';  

export const fetchPrograms = createAsyncThunk<ListProgramResponse, ProgramListArg>(
  'programs/fetchPrograms',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      const queryString = query.toString();
      const response = await axiosInstance.get(`${PROGRAMS}?${queryString}`);
      return response.data as ListProgramResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch programs failed');
    }
  }
);
